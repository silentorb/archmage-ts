/// <reference types="bluebird" />
import { Project } from "../project/project";
import * as Promise from 'bluebird';
export declare function install(project: Project, config: any): Promise<any[]>;
export declare function runConsole(): Promise<any[]>;
