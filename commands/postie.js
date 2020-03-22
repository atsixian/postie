const chalk = require("chalk");
const fileUtil = require("../lib/fileUtil");
const question = require("../lib/inquirer");
const init = require("../commands/init");

const success = filepath => {
  console.log(chalk.yellow.bold(`Done! File created at ${filepath}`));
};

const pad = number => number.toString().padStart(2, "0");

const postie = async (template, path) => {
  init();
  const answer = await question.askPostInfo(template);
  const today = new Date();
  answer.date = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  const filePath = fileUtil.createFile(answer, template, path);
  success(filePath);

  if ((await question.openFile()).open) {
    open(filePath);
  }
};

module.exports = postie;
