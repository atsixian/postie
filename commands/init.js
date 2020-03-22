const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");

const init = () => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync("POSTIE", {
        font: "bubble",
        horizontalLayout: "full"
      })
    )
  );
  console.log(chalk.blue("Create a new post"));
};
module.exports = init;
