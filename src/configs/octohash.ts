import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_MARKDOWN, GLOB_YAML } from '@antfu/eslint-config'

export async function octohash(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'octohash/octohash/rules',
      files: [GLOB_YAML],
      rules: {
        // PNPM
        'pnpm/yaml-enforce-settings': 'off',
      },
    },
    {
      name: 'octohash/markdown/rules',
      files: [GLOB_MARKDOWN],
      rules: {
        'markdown/no-unused-definitions': 'off',
      },
    },
  ]
}
