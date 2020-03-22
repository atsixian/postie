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
      return yargs
        .option("t", {
          type: "string",
          alias: "template",
          describe: "Create file with a specific template",
          nargs: 1
        })
        .option("p", {
          type: "string",
          alias: "path",
          describe: "Output directory for markdown files",
          nargs: 1
        });
    },
    ({ t, p }) => run(t, p)
  )
  .command(
    "config",
    "Open the configuration file",
    yargs =>
      yargs.option("p", {
        alias: "path",
        type: "string",
        nargs: 1,
        describe: "Default path for markdown files created"
      }),
    ({ p }) => {
      config.set("outputPath", p);
      console.log("Default path modified");
    }
  )
  .command(
    "new",
    "Create a new template",
    yargs =>
      yargs
        .option("l", {
          alias: "list",
          type: "array",
          describe: "Fields that are lists"
        })
        .option("s", {
          alias: "string",
          type: "string",
          describe: "Fields that are strings"
        }),
    ({ l, s }) => console.log(l, s)
  )
  .help("h")
  .alias("h", "help")
  .example("$0 -t mytemplate")
  .example("$0 -p ..")
  .example("$0 -p /path/to/your/directory")
  .example("$0 config -p /default/output/directory")
  .usage(
    "Usage: $0 <command> [options]\n Use $0 <command> -h to see available options for each command"
  ).argv;

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
