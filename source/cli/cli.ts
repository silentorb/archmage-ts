import {Project} from "../project/project"
import {load_project} from "../project/loading"
import * as shell from 'shelljs'
import * as git from "nodegit"
import * as Promise from 'bluebird'
const fs = require('fs')

function gitCommand(command) {
  if (process.platform === 'win32') {
    shell.exec('powershell "' + command + '"')
  }
  else {
    shell.exec(command)
  }
}
function gitClone(dependency, path) {
  const remote = dependency.remote
  const git_remote = 'git@github.com:' + remote.path + '.git'
  const final_path = path + '/' + dependency.name
  shell.cd(path)
  if (fs.existsSync(final_path)) {
    console.log('Updating', dependency.name)
    shell.cd(final_path)
    gitCommand('git pull')
  }
  else {
    console.log('Cloning', dependency.name)
    gitCommand('git clone git@github.com:' + remote.path + '.git ' + dependency.name)
  }
  // const cloneOptions:any = {}
  // cloneOptions.fetchOpts = {
  //   callbacks: {
  //     certificateCheck: function() { return 1; },
  //     credentials: function(url, userName) {
  //       return git.Cred.sshKeyFromAgent(userName);
  //     }
  //   }
  // };
  // return git.Clone(git_remote, path, cloneOptions)
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