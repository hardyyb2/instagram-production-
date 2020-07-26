const chalk = require('chalk')

const errorMsg = (msg) => console.log(chalk.bgRed.white(msg))
const successMsg = (msg) => console.log(chalk.bgGreen.white(msg))
const databaseSuccessMsg = (msg) => console.log(chalk.bgWhite(msg))
const databaseErrorMsg = (msg) => console.log(chalk.red(msg))

module.exports = {
  errorMsg,
  successMsg,
  databaseErrorMsg,
  databaseSuccessMsg,
}
