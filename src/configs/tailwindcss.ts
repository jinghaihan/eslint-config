import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsTailwindcss } from '../types'
import process from 'node:process'
import { ensurePackages, GLOB_SRC, GLOB_VUE, interopDefault } from '@antfu/eslint-config'
import { resolve } from 'pathe'
import { findPackageInWorkspace } from '../utils'

export async function tailwindcss(options: OptionsTailwindcss = {}): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_SRC, GLOB_VUE],
    overrides = {},
    settings = {},
  } = options
  const configuredCwd = settings.cwd ? resolve(process.cwd(), settings.cwd) : process.cwd()
  const tailwindCwd = await findPackageInWorkspace('tailwindcss', configuredCwd)
  if (!tailwindCwd)
    return []

  await ensurePackages([
    'eslint-plugin-better-tailwindcss',
  ])

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
        'better-tailwindcss': {
          cwd: tailwindCwd,
          ...settings,
        },
      },
    },
  ]
}
