import process from 'node:process'
import { findUp } from 'find-up-simple'
import { dirname } from 'pathe'
import { REPOSITORY_ROOT_FILES } from './constants'

export async function findRepositoryRoot(): Promise<string> {
  for (const file of REPOSITORY_ROOT_FILES) {
    const filepath = await findUp(file, file === '.git' ? { type: 'directory' } : undefined)
    if (filepath)
      return dirname(filepath)
  }
  return process.cwd()
}

export function pathDepth(filepath: string): number {
  return filepath.split('/').length
}
