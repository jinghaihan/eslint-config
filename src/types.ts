import type {
  Awaitable,
  OptionsConfig,
  OptionsFiles,
  OptionsOverrides,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export interface Options extends AntfuOptions {
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
    cwd?: string
    entryPoint?: string
    tailwindConfig?: string
    tsconfig?: string
    detectComponentClasses?: boolean
    rootFontSize?: number
    messageStyle?: 'visual' | 'compact' | 'raw'
    attributes?: Array<string | Matcher[]>
    callees?: Array<string | Matcher[]>
    variables?: Array<string | Matcher[]>
    tags?: Array<string | Matcher[]>
  }
}
