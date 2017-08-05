"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = require("./install");
function runConsole() {
    console.log('Using Archmage!');
    const config = require('../../config/config.json');
    return install_1.install(process.cwd().replace("\\", '/'), config);
}
exports.runConsole = runConsole;
//# sourceMappingURL=cli.js.map