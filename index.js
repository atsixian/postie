const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const question = require("./lib/inquirer");
const fileUtil = require("./lib/fileUtil");

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
  console.log("Create a new post");
};

const success = filepath => {
  console.log(chalk.yellow.bold(`Done! File created at ${filepath}`));
};

const run = async () => {
  init();
  const answer = await question.askPostInfo();
  const today = new Date();
  answer.date = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}`;
  success(fileUtil.createFile(answer));
};

run();
