import type { Options, UserConfig } from './types'
import antfu from '@antfu/eslint-config'
import { octohash, sortPackageJson, tailwindcss } from './configs'

export function defineConfig(options?: Options, ...userConfigs: UserConfig) {
  const config = antfu(
    mergeOptions(options),
    ...userConfigs,
  )

  const enableTailwindCSS = typeof options?.tailwindcss === 'boolean' || options?.tailwindcss
  if (enableTailwindCSS) {
    config
      .append(tailwindcss(typeof enableTailwindCSS === 'boolean' ? {} : enableTailwindCSS))
      .renamePlugins({
        'better-tailwindcss': 'tailwindcss',
      })
  }

  config.append(sortPackageJson())
  config.append(octohash())

  return config
}

function mergeOptions(options?: Options) {
  return {
    ...options,
    formatters: {
      ...(typeof options?.formatters === 'object' ? options.formatters : {}),
    },
  }
}
