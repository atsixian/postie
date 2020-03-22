#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const open = require("open");
const question = require("./lib/inquirer");
const fileUtil = require("./lib/fileUtil");
const config = require("./lib/config");

const success = filepath => {
  console.log(chalk.yellow.bold(`Done! File created at ${filepath}`));
};

const pad = number => number.toString().padStart(2, "0");

const argv = require("yargs")
  .command(
    "$0",
    "Create file with default template",
    yargs => {
      return yargs.option("t").option("p");
    },
    ({ t, p }) => run(t, p)
  )
  .command(
    "config",
    "Open the configuration file",
    yargs => yargs.p,
    ({ p }) => {
      config.set("outputPath", p);
      console.log("Default path modified");
    }
  )
  .help("h")
  .alias("h", "help")
  .alias("t", "template")
  .nargs("t", 1)
  .describe("t", "Create file with a specific template")
  .example("$0 -t mytemplate")
  .alias("p", "path")
  .nargs("p", 1)
  .describe("p", "Output directory for markdown files")
  .example("$0 -p ..")
  .example("$0 -p /path/to/your/directory")
  .example("$0 config -p /default/output/directory")
  .usage("Usage: $0 <command> [options]").argv;

function init() {
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
}

async function run(template, path) {
  init();
  const answer = await question.askPostInfo(template);
  const today = new Date();
  answer.date = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  const filePath = fileUtil.createFile(answer, template, path);
  success(filePath);

  if ((await question.openFile()).open) {
    await open(filePath);
  }
}

const template = async () => {
  const res = await question.createTemplate();
  fileUtil.createTemplateFile(
    res.templateName,
    `module.exports = ${res.template}`
  );
  console.log(chalk.green("Template Created"));
};

// template();
