import { readdirSync, readFileSync } from 'node:fs'
import process from 'node:process'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import { isPackageExists } from 'local-pkg'
import { join } from 'pathe'

// https://github.com/hyoban/eslint-plugin-tailwindcss/pull/3
export function tailwindCSS(dir?: string) {
  const installed = isPackageExists('tailwindcss')
  if (!installed)
    return []

  const config = findTailwindImportCSS(dir ?? process.cwd())
  if (!config)
    return []

  return {
    ...tailwindPlugin.configs['flat/recommended'],
    settings: {
      tailwindcss: {
        config,
      },
    },
  }
}

function findTailwindImportCSS(dir: string): string | null {
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      const found = findTailwindImportCSS(fullPath)
      if (found)
        return found
    }
    else if (entry.isFile() && entry.name.endsWith('.css')) {
      // read & scan lines
      const lines = readFileSync(fullPath, 'utf8').split(/\r?\n/)
      for (const line of lines) {
        if (line.trim().startsWith('@import "tailwindcss'))
          return fullPath
      }
    }
  }

  return null
}
