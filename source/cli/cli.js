"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loading_1 = require("../project/loading");
const shell = require("shelljs");
const Promise = require("bluebird");
const fs = require('fs');
function gitCommand(command) {
    if (process.platform === 'win32') {
        shell.exec('powershell "' + command + '"');
    }
    else {
        shell.exec(command);
    }
}
function gitClone(dependency, path) {
    const remote = dependency.remote;
    const git_remote = 'git@github.com:' + remote.path + '.git';
    const final_path = path + '/' + dependency.name;
    shell.cd(path);
    if (fs.existsSync(final_path)) {
        console.log('Updating', dependency.name);
        shell.cd(final_path);
        gitCommand('git pull');
    }
    else {
        console.log('Cloning', dependency.name);
        gitCommand('git clone git@github.com:' + remote.path + '.git ' + dependency.name);
    }
}
function install(project, config) {
    shell.mkdir('-p', config.shared_path);
    var list = [];
    const dependencies = project.getExternalDependencies();
    for (var i in dependencies) {
        const dependency = dependencies[i];
        list.push(dependency);
    }
    return Promise.each(list, dependency => gitClone(dependency, config.shared_path));
}
exports.install = install;
function runConsole() {
    console.log('Using Archmage!');
    const path = require('path');
    const project = loading_1.load_project(path.join(process.cwd().replace("\\", '/'), 'archmage.json'));
    const config = require('../../config/config.json');
    return install(project, config);
}
exports.runConsole = runConsole;
//# sourceMappingURL=cli.js.map