"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("./project");
function load_project(project_path) {
    const fs = require('fs');
    const json = fs.readFileSync(project_path);
    const content = JSON.parse(json);
    const project = new project_1.Project();
    for (let i in content.external) {
        const dependency = content.external[i];
        dependency.name = i;
        project.addExternalDependency(dependency);
    }
    project.scripts = content.scripts;
    return project;
}
exports.load_project = load_project;
//# sourceMappingURL=loading.js.map