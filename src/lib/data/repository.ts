import { IRepository } from './IRepository'
import { LocalRepository } from './local/LocalRepository'

let repositoryInstance: IRepository | null = null

export function getRepository(): IRepository {
  if (!repositoryInstance) {
    repositoryInstance = new LocalRepository()
  }
  return repositoryInstance
}

export function setRepository(repo: IRepository): void {
  repositoryInstance = repo
}
