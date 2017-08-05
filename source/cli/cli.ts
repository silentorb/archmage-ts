import {Project} from "../project/project"
import {load_project} from "../project/loading"

import {install} from "./install"

export function runConsole() {
  console.log('Using Archmage!')
  const config = require('../../config/config.json')
  return install(process.cwd().replace("\\", '/'), config)
}