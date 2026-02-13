export const DEFAULT_IGNORE_PATHS = [
  '**/.git/**',
  '**/.next/**',
  '**/.nuxt/**',
  '**/.output/**',
  '**/.vercel/**',
  '**/.vscode/**',
  '**/.idea/**',
  '**/coverage/**',
  '**/dist/**',
  '**/build/**',
  '**/node_modules/**',
  '**/dist/**',
  '**/public/**',
  '**/fixture/**',
  '**/fixtures/**',
]

export const REPOSITORY_ROOT_FILES = [
  '.git',
  'package-lock.json',
  'npm-shrinkwrap.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
  'deno.lock',
]

export const TAILWIND_V3_CONFIG_PATTERNS = [
  '**/tailwind.config.ts',
  '**/tailwind.config.mjs',
  '**/tailwind.config.cjs',
  '**/tailwind.config.js',
]

export const TAILWIND_V4_IMPORT_RE = /@import\s+['"]tailwindcss(?:\/[^'"]*)?['"]/
