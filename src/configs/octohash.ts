import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Options } from '../types'
import { GLOB_MARKDOWN, GLOB_YAML } from '@antfu/eslint-config'

export async function octohash(options?: Options): Promise<TypedFlatConfigItem[]> {
  const configs: TypedFlatConfigItem[] = [
    {
      name: 'octohash/octohash/rules',
      files: [GLOB_YAML],
      rules: {
        // PNPM
        'pnpm/yaml-enforce-settings': 'off',
      },
    },
  ]

  if (options?.markdown !== false) {
    configs.push({
      name: 'octohash/markdown/rules',
      files: [GLOB_MARKDOWN],
      rules: {
        'markdown/no-unused-definitions': 'off',
      },
    })
  }

  return configs
}
