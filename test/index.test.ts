import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ESLint } from 'eslint'
import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'
import { defineConfig } from '../src'
import { tailwindcss } from '../src/configs'

async function withTailwindWorkspace<T>(run: () => Promise<T>): Promise<T> {
  const root = await mkdtemp(join(tmpdir(), 'octohash-eslint-config-'))
  const packageRoot = join(root, 'packages/ui')
  const tailwindRoot = join(packageRoot, 'node_modules/tailwindcss')
  const originalCwd = process.cwd()

  await mkdir(tailwindRoot, { recursive: true })
  await writeFile(join(root, 'package.json'), '{}')
  await writeFile(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n')
  await writeFile(join(packageRoot, 'package.json'), '{"devDependencies":{"tailwindcss":"^4.0.0"}}')
  await writeFile(join(tailwindRoot, 'package.json'), '{"name":"tailwindcss","version":"4.0.0"}')

  try {
    process.chdir(root)
    return await run()
  }
  finally {
    process.chdir(originalCwd)
    await rm(root, { force: true, recursive: true })
  }
}

describe.sequential('defineConfig', () => {
  it('disables unused Markdown definitions', async () => {
    const eslint = new ESLint({
      overrideConfig: await defineConfig({ markdown: true }),
      overrideConfigFile: true,
    })

    const config = await eslint.calculateConfigForFile('README.md')

    expect(config?.rules?.['markdown/no-unused-definitions']?.[0]).toBe(0)
  })

  it('does not lint Markdown when Markdown support is disabled', async () => {
    const eslint = new ESLint({
      overrideConfig: await defineConfig({ markdown: false }),
      overrideConfigFile: true,
    })

    const config = await eslint.calculateConfigForFile('README.md')

    expect(config).toBeUndefined()
  })

  it('enables Tailwind CSS when it is installed in a workspace package', async () => {
    await withTailwindWorkspace(async () => {
      const configs = await tailwindcss()
      const rulesConfig = configs.find(config => config.name === 'octohash/tailwindcss/rules')
      const settings = rulesConfig?.settings as Record<string, { cwd?: string }> | undefined

      expect(settings?.['better-tailwindcss']?.cwd).toBe(resolve(process.cwd(), 'packages/ui'))
    })
  })

  it('does not lint HTML without an HTML parser', async () => {
    await withTailwindWorkspace(async () => {
      const eslint = new ESLint({
        overrideConfig: await defineConfig({ tailwindcss: true }),
        overrideConfigFile: true,
      })

      const config = await eslint.calculateConfigForFile('packages/ui/index.html')

      expect(config).toBeUndefined()
    })
  })

  it('keeps Tailwind CSS disabled when explicitly set to false', async () => {
    await withTailwindWorkspace(async () => {
      const configs = await defineConfig({ tailwindcss: false })

      expect(configs.some(config => config.name?.startsWith('octohash/tailwindcss'))).toBe(false)
    })
  })
})
