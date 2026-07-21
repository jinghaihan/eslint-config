import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { defineConfig } from '../src'

describe('defineConfig', () => {
  it('disables unused Markdown definitions', async () => {
    const eslint = new ESLint({
      overrideConfig: await defineConfig({ markdown: true }),
      overrideConfigFile: true,
    })

    const config = await eslint.calculateConfigForFile('README.md')

    expect(config?.rules?.['markdown/no-unused-definitions']?.[0]).toBe(0)
  })
})
