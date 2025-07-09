import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export type Options = AntfuOptions & {}

export type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>

export type UserConfig = Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
