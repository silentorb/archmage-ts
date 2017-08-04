import { DependencyWithoutName } from "./types";
import { Project } from "./project";
export interface ProjectSource {
    external: {
        [key: string]: DependencyWithoutName;
    };
}
export declare function load_project(project_path: string): Project;
