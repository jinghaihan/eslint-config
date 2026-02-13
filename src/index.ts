import type { Options, UserConfig } from './types'
import antfu from '@antfu/eslint-config'

export function defineConfig(options?: Options, ...userConfigs: UserConfig) {
  return antfu(
    mergeOptions(options),
    ...userConfigs,
  )
}

function mergeOptions(options?: Options) {
  return {
    ...options,
    formatters: {
      ...(typeof options?.formatters === 'object' ? options.formatters : {}),
    },
  }
}
