import {Dependency} from "./types"

export type DependencyMap = { [key: string]: Dependency }

export class Project {
  private externalDependencies: DependencyMap = {}

  addExternalDependency(dependency) {
    this.externalDependencies[dependency.name] = dependency
  }

  getExternalDependencies() {
    return this.externalDependencies
  }
}
