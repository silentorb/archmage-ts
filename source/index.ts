require('source-map-support').install()
import {runConsole} from "./cli"

runConsole()
  .then(() => console.log('finished.'))
