export interface Remote_Source {
    type: string;
    path: string;
}
export interface DependencyWithoutName {
    remote: Remote_Source;
}
export interface Dependency extends DependencyWithoutName {
    name: string;
    install?: string | string[];
}
export interface PathsConfig {
    shared: string;
    cmake_tools: string;
}
export interface Config {
    paths: PathsConfig;
}
