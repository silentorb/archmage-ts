"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor() {
        this.externalDependencies = {};
    }
    addExternalDependency(dependency) {
        this.externalDependencies[dependency.name] = dependency;
    }
    getExternalDependencies() {
        return this.externalDependencies;
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map