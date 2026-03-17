import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function octohash(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'octohash/octohash/rules',
      rules: {
        // PNPM
        'pnpm/yaml-enforce-settings': 'off',
        // Markdown
        'markdown/no-unused-definitions': 'off',
      },
    },
  ]
}
