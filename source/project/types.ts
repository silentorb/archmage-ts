
export interface Remote_Source {
  type: string
  path: string
}

export interface DependencyWithoutName {
  remote: Remote_Source;
}

export interface Dependency extends DependencyWithoutName {
  name: string
}
