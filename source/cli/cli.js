"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loading_1 = require("../project/loading");
const git = require("nodegit");
const Promise = require("bluebird");
function gitClone(dependency, path) {
    const remote = dependency.remote;
    const git_remote = 'git@github.com:' + remote.path + '.git';
    // shell.cd(config.shared_path)
    // shell.exec('powershell "git clone git@github.com:' + remote.path + '.git ' + dependency.name + '"')
    const cloneOptions = {};
    cloneOptions.fetchOpts = {
        callbacks: {
            certificateCheck: function () { return 1; },
            credentials: function (url, userName) {
                return git.Cred.sshKeyFromAgent(userName);
            }
        }
    };
    return git.Clone(git_remote, path, cloneOptions);
}
function install(project, config) {
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