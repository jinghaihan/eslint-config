import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsTailwindcss } from '../types'
import { readFile } from 'node:fs/promises'
import { GLOB_HTML, GLOB_SRC, GLOB_VUE, interopDefault } from '@antfu/eslint-config'
import { getPackageInfo, isPackageExists } from 'local-pkg'
import { basename, resolve } from 'pathe'
import { glob } from 'tinyglobby'
import {
  DEFAULT_IGNORE_PATHS,
  TAILWIND_PLUGIN_NAME,
  TAILWIND_V3_CONFIG_PATTERNS,
  TAILWIND_V4_IMPORT_RE,
} from '../constants'
import { findRepositoryRoot, pathDepth } from '../utils'

export async function tailwindcss(options: OptionsTailwindcss = {}): Promise<TypedFlatConfigItem[]> {
  const pkg = await getPackageInfo('tailwindcss')
  if (!pkg || !pkg.version)
    return []

  const { installPackage } = await import('@antfu/install-pkg')
  if (!isPackageExists(TAILWIND_PLUGIN_NAME))
    await installPackage(TAILWIND_PLUGIN_NAME, { dev: true })

  const version = pkg.version
  const {
    files = [GLOB_HTML, GLOB_SRC, GLOB_VUE],
    overrides = {},
    settings = {},
  } = options
  const resolvedSettings = await resolveTailwindSettings(settings, version)

  return [
    {
      name: 'octohash/tailwindcss/setup',
      plugins: {
        tailwindcss: await interopDefault(import('eslint-plugin-better-tailwindcss')),
      },
    },
    {
      files,
      name: 'octohash/tailwindcss/rules',
      rules: {
        'tailwindcss/enforce-consistent-line-wrapping': 'error',
        'tailwindcss/enforce-consistent-class-order': 'error',
        'tailwindcss/enforce-consistent-variable-syntax': 'error',
        'tailwindcss/enforce-consistent-important-position': 'error',
        'tailwindcss/enforce-shorthand-classes': 'error',
        'tailwindcss/enforce-canonical-classes': 'error',
        'tailwindcss/no-duplicate-classes': 'error',
        'tailwindcss/no-deprecated-classes': 'error',
        'tailwindcss/no-unnecessary-whitespace': 'error',
        'tailwindcss/no-conflicting-classes': 'error',
        ...overrides,
      },
      settings: {
        'better-tailwindcss': resolvedSettings,
      },
    },
  ]
}

async function resolveTailwindSettings(
  settings: OptionsTailwindcss['settings'] | undefined,
  version: string,
): Promise<OptionsTailwindcss['settings']> {
  const resolvedSettings: OptionsTailwindcss['settings'] = { ...(settings ?? {}) }
  const major = Number.parseInt(version, 10)

  const cwd = await findRepositoryRoot()

  if (major === 4 && !resolvedSettings.entryPoint)
    resolvedSettings.entryPoint = await findTailwindV4ImportCSS(cwd) ?? undefined

  if (major === 3 && !resolvedSettings.tailwindConfig)
    resolvedSettings.tailwindConfig = await findTailwindV3Config(cwd) ?? undefined

  return resolvedSettings
}

async function findTailwindV3Config(cwd: string): Promise<string | undefined> {
  const files = await glob(TAILWIND_V3_CONFIG_PATTERNS, {
    cwd,
    ignore: DEFAULT_IGNORE_PATHS,
    onlyFiles: true,
  })

  if (files.length === 0)
    return undefined

  const extensionPriority = new Map(
    TAILWIND_V3_CONFIG_PATTERNS.map((pattern, index) => [basename(pattern), index]),
  )

  files.sort((a, b) => {
    const depthDiff = pathDepth(a) - pathDepth(b)
    if (depthDiff !== 0)
      return depthDiff

    return (extensionPriority.get(basename(a)) ?? Number.POSITIVE_INFINITY)
      - (extensionPriority.get(basename(b)) ?? Number.POSITIVE_INFINITY)
  })

  return resolve(cwd, files[0])
}

async function findTailwindV4ImportCSS(cwd: string): Promise<string | undefined> {
  const files = await glob('**/*.css', {
    cwd,
    ignore: DEFAULT_IGNORE_PATHS,
    onlyFiles: true,
  })

  files.sort((a, b) => pathDepth(a) - pathDepth(b))

  for (const file of files) {
    const fullPath = resolve(cwd, file)
    // Prioritize the closest entrypoint candidate and stop at the first valid @import.
    if (await hasTailwindV4Import(fullPath))
      return fullPath
  }

  return undefined
}

async function hasTailwindV4Import(filePath: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, 'utf-8')
    return TAILWIND_V4_IMPORT_RE.test(content)
  }
  catch {
    return false
  }
}
