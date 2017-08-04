import {Project} from "../project/project"
import {load_project} from "../project/loading"
import * as shell from 'shelljs'
import * as git from "nodegit"
import * as Promise from 'bluebird'

function gitClone(dependency, path) {
  const remote = dependency.remote
  const git_remote = 'git@github.com:' + remote.path + '.git'
  // shell.cd(config.shared_path)
  // shell.exec('powershell "git clone git@github.com:' + remote.path + '.git ' + dependency.name + '"')
  const cloneOptions:any = {}
  cloneOptions.fetchOpts = {
    callbacks: {
      certificateCheck: function() { return 1; },
      credentials: function(url, userName) {
        return git.Cred.sshKeyFromAgent(userName);
      }
    }
  };
  return git.Clone(git_remote, path, cloneOptions)
}

export function install(project: Project, config) {
  var list = []
  const dependencies = project.getExternalDependencies()
  for (var i in dependencies) {
    const dependency = dependencies[i]
    list.push(dependency)
  }
  return Promise.each(list, dependency => gitClone(dependency, config.shared_path))
}

export function runConsole() {
  console.log('Using Archmage!')
  const path = require('path')
  const project = load_project(path.join(process.cwd().replace("\\", '/'), 'archmage.json'))
  const config = require('../../config/config.json')
  return install(project, config)
}