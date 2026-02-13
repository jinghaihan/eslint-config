import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function octohash(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'octohash/octohash/rules',
      rules: {
        'pnpm/yaml-enforce-settings': 'off',
      },
    },
  ]
}
