# @octohash/eslint-config

[![npm version][npm-version-src]][npm-version-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A personal ESLint config, built as an extension of
[`@antfu/eslint-config`](https://github.com/antfu/eslint-config).

## Install

```bash
pnpm add -D @octohash/eslint-config eslint
```

## Usage

```ts
import { defineConfig } from '@octohash/eslint-config'

export default defineConfig()
```

## What This Adds

- Adds first-class `Tailwind CSS` linting/formatting rules powered by
  [`eslint-plugin-better-tailwindcss`](https://github.com/schoero/eslint-plugin-better-tailwindcss)
- Includes `catalogs-sort` rules for consistent dependency catalog ordering

## Tailwind CSS

Enable Tailwind CSS support explicitly:

```ts
export default defineConfig({
  tailwindcss: true,
})
```

Once enabled, Tailwind CSS can be installed in the root package or any package
in a monorepo. Its project configuration is detected automatically:

- Tailwind v4: auto-detects a CSS entry that imports `tailwindcss`
- Tailwind v3: auto-detects `tailwind.config.*`

You can still override with `settings.entryPoint` or `settings.tailwindConfig`
when needed.

## Credits

Inspired by
[`@antfu/eslint-config`](https://github.com/antfu/eslint-config)
and
[`eslint-config-hyoban`](https://github.com/hyoban/eslint-config-hyoban).

## License

[MIT](./LICENSE) License © [jinghaihan](https://github.com/jinghaihan)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@octohash/eslint-config?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@octohash/eslint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@octohash/eslint-config?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@octohash/eslint-config
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@octohash/eslint-config?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@octohash/eslint-config
[license-src]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/jinghaihan/@octohash/eslint-config/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@octohash/eslint-config
