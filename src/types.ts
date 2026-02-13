import type {
  Awaitable,
  OptionsConfig,
  OptionsFiles,
  OptionsFormatters,
  OptionsOverrides,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export interface Options extends Omit<AntfuOptions, 'formatters'> {
  formatters?: boolean | FormattersOptions
}

export interface FormattersOptions extends OptionsFormatters {
  tailwindcss?: boolean | OptionsTailwindcss
}

export type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>

export type UserConfig = Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]

interface Matcher {
  name: string
  configurations: {
    match: 'objectKeys' | 'objectValues' | 'strings'
    pathPattern?: string
  }[]
}

export interface OptionsTailwindcss extends OptionsFiles, OptionsOverrides {
  settings?: {
    entryPoint?: string | undefined
    tailwindConfig?: string | undefined
    tsconfig?: string | undefined
    detectComponentClasses?: boolean | undefined
    rootFontSize?: number | undefined
    messageStyle?: 'visual' | 'compact' | 'raw' | undefined
    attributes?: Array<string | Matcher[]> | undefined
    callees?: Array<string | Matcher[]> | undefined
    variables?: Array<string | Matcher[]> | undefined
    tags?: Array<string | Matcher[]> | undefined
  }
}
