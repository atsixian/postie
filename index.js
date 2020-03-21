const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const question = require("./lib/inquirer");
const fileUtil = require("./lib/fileUtil");
const open = require("open");

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

const success = filepath => {
  console.log(chalk.yellow.bold(`Done! File created at ${filepath}`));
};

const pad = number => number.toString().padStart(2, "0");

const run = async () => {
  init();
  const answer = await question.askPostInfo();
  const today = new Date();
  answer.date = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;
  const filePath = fileUtil.createFile(answer);
  success(filePath);

  if ((await question.openFile()).open) {
    await open(filePath);
  }
};

run();
