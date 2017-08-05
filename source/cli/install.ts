import {Config} from "../project/types"
const fs = require('fs')
import * as shell from 'shelljs'
import * as git from "nodegit"
import {Project} from "../project/project"
import {load_project} from "../project/loading"

export interface Task {
  tool: string
  file?: string
}

function shellCommand(command) {
  console.log('shell', command)
  if (process.platform === 'win32') {
    shell.exec('powershell "' + command + '"')
  }
  else {
    shell.exec(command)
  }
}

class Installer {
  config: Config
  project_path: string

  constructor(project_path: string, config: Config) {
    this.config = config
    this.project_path = project_path
  }

  run_cmake(task: Task) {
    shellCommand('cmake ' + '-DCMAKE_TOOLS_DIR="' + this.config.paths.cmake_tools + '"'
      + ' -P ' + task.file + '.cmake')
  }

  run_javascript(path: string, task: Task) {
    const helper = {
      shell: shell,
      shellCommand: shellCommand
    }
    require(path + '/' + task.file + '.js')(helper)
  }

  run_project_task(path: string, task: Task) {
    switch (task.tool) {
      case'cmake':
        shell.cd(path)
        this.run_cmake(task)
        break

      case'js':
        shell.cd(path)
        this.run_javascript(path, task)
        break

      default:
        throw new Error("Invalid script task: " + task)
    }
  }

  run_project_tasks(tasks: Task []) {
    for (let task of tasks) {
      this.run_project_task(this.project_path, task)
    }
    shell.cd('..')
  }

  process_dependency_info(final_path: string) {
    const project_file_path = final_path + '/archmage.json'
    if (fs.existsSync(project_file_path)) {
      install(final_path, this.config)
    }
  }

  download_dependency(dependency, path, final_path, folder_name) {
    const remote = dependency.remote
    const git_remote = remote.type == 'github'
      ? 'git@github.com:' + remote.path + '.git'
      : remote.path

    shell.cd(path)
    if (fs.existsSync(final_path)) {
      console.log('Updating', dependency.name)
      shell.cd(final_path)
      shellCommand('git pull')
    }
    else {
      console.log('Cloning', dependency.name)
      shellCommand('git clone ' + git_remote + ' ' + folder_name)
    }
  }

  installDependency(dependency, path) {
    const folder_name = dependency.parent ? dependency.parent : dependency.name
    const final_path = path + '/' + folder_name
    this.download_dependency(dependency, path, final_path, folder_name)
    this.process_dependency_info(final_path)
  }

}

export function install(project_path: string, config: Config) {
  const path = require('path')
  const project = load_project(path.join(project_path, 'archmage.json'))

  shell.mkdir('-p', config.paths.shared)
  const list = []
  const dependencies = project.getExternalDependencies()

  const installer = new Installer(project_path, config)

  for (let i in dependencies) {
    const dependency = dependencies[i]
    installer.installDependency(dependency, config.paths.shared)
  }

  if (project.scripts && project.scripts.install) {
    installer.run_project_tasks(project.scripts.install)
  }
}
