import { Dependency } from "./types";
export declare type DependencyMap = {
    [key: string]: Dependency;
};
export declare class Project {
    private externalDependencies;
    scripts: any;
    addExternalDependency(dependency: any): void;
    getExternalDependencies(): DependencyMap;
}
