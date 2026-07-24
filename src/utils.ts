import process from 'node:process'
import { findUp } from 'find-up-simple'
import { isPackageExists } from 'local-pkg'
import { dirname, resolve } from 'pathe'
import { glob } from 'tinyglobby'
import { DEFAULT_IGNORE_PATHS, REPOSITORY_ROOT_FILES } from './constants'

export async function findRepositoryRoot(cwd = process.cwd()): Promise<string> {
  for (const file of REPOSITORY_ROOT_FILES) {
    const filepath = await findUp(file, {
      cwd,
      ...(file === '.git' ? { type: 'directory' as const } : {}),
    })
    if (filepath)
      return dirname(filepath)
  }
  return cwd
}

export async function findPackageInWorkspace(name: string, cwd = process.cwd()): Promise<string | undefined> {
  if (isPackageExists(name, { paths: [cwd] }))
    return cwd

  const root = await findRepositoryRoot(cwd)
  const packageJsonFiles = await glob(['package.json', '**/package.json'], {
    cwd: root,
    ignore: DEFAULT_IGNORE_PATHS,
    onlyFiles: true,
  })
  const packageDirectories = packageJsonFiles.map(file => resolve(root, dirname(file)))

  return packageDirectories.find(directory => isPackageExists(name, { paths: [directory] }))
}

export function pathDepth(filepath: string): number {
  return filepath.split('/').length
}
