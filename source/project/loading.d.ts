import { DependencyWithoutName } from "./types";
import { Project } from "./project";
export interface ProjectSource {
    external: {
        [key: string]: DependencyWithoutName;
    };
    scripts: any;
}
export declare function load_project(project_path: string): Project;
