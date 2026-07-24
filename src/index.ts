import type { Options, UserConfig } from './types'
import antfu from '@antfu/eslint-config'
import { octohash, sortPackageJson, tailwindcss } from './configs'

export function defineConfig(options?: Options, ...userConfigs: UserConfig) {
  const config = antfu(mergeOptions(options), ...userConfigs)

  const enableTailwindCSS = options?.tailwindcss
  if (enableTailwindCSS) {
    config
      .append(tailwindcss(enableTailwindCSS === true ? {} : enableTailwindCSS))
      .renamePlugins({
        'better-tailwindcss': 'tailwindcss',
      })
  }

  config.append(sortPackageJson())
  config.append(octohash(options))

  return config
}

function mergeOptions(options?: Options) {
  const formatters = typeof options?.formatters === 'object'
    ? options.formatters
    : typeof options?.formatters === 'boolean'
      ? options.formatters
      : undefined

  return {
    ...options,
    formatters,
  }
}
