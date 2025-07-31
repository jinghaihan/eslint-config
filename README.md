# @octohash/eslint-config

[![npm version][npm-version-src]][npm-version-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A comprehensive ESLint configuration package optimized for **application development**, built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config). This configuration provides a robust foundation for modern web applications with built-in support for Vue, TypeScript, and **Tailwind CSS v4**.

Since the target is web application development, CSS and HTML formatting are enabled by default.

## Installation

```bash
pnpm add -D @octohash/eslint-config
```

## Usage

### Basic Setup

Create an `eslint.config.js` file in your project root:

```javascript
import { defineConfig } from '@octohash/eslint-config'

export default defineConfig()
```

### With Custom Options

```javascript
import { defineConfig } from '@octohash/eslint-config'

export default defineConfig(
  {
    vue: true,
    formatters: {
      css: true,
      html: true,
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-unused-vars': 'off',
    },
  }
)
```

### Tailwind CSS v4 Setup

1. Install Tailwind CSS v4:
```bash
pnpm add tailwindcss@4
```

2. Create your CSS file with v4 syntax:
```css
@import 'tailwindcss';

/* Your custom styles */
```

3. The ESLint configuration will automatically detect and validate your Tailwind CSS usage.

## Migration from @antfu/eslint-config

If you're currently using `@antfu/eslint-config` directly, you can easily migrate:

**Before:**
```javascript
import antfu from '@antfu/eslint-config'

export default antfu()
```

**After:**
```javascript
import { defineConfig } from '@octohash/eslint-config'

export default defineConfig()
```

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
