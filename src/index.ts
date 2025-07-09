import type { Options, UserConfig } from './types'
import antfu from '@antfu/eslint-config'
import { tailwindCSS } from './tailwindcss'

export function defineConfig(options?: Options, ...userConfigs: UserConfig) {
  return antfu(
    mergeOptions(options),
    tailwindCSS(),
    ...userConfigs,
  )
}

function mergeOptions(options?: Options) {
  return {
    ...options,
    stylistic: true,
    formatters: {
      css: true,
      html: true,
      ...(typeof options?.formatters === 'object' ? options.formatters : {}),
    },
  }
}
