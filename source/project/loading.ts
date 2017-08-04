import {Dependency, DependencyWithoutName} from "./types"
import {Project} from "./project"

export interface ProjectSource {
  external: { [key: string]: DependencyWithoutName }
}

export function load_project(project_path: string) {
  const fs = require('fs')
  const json = fs.readFileSync(project_path)
  const content = JSON.parse(json) as ProjectSource

  const project = new Project()
  for (let i in content.external) {
    const dependency = content.external[i] as Dependency
    dependency.name = i
    project.addExternalDependency(dependency)
  }

  return project
}