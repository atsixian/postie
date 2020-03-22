#!/usr/bin/env node

const open = require("open");
const { config } = require("./lib/config");
const postie = require("./commands/postie");
const newTemplate = require("./commands/newTemplate");

const argv = require("yargs")
  .command(
    "$0",
    "Create file with default template",
    yargs => {
      return yargs
        .option("template", {
          type: "string",
          alias: "t",
          describe: "Create file with a specific template",
          nargs: 1
        })
        .option("path", {
          type: "string",
          alias: "p",
          describe: "Output directory for markdown files",
          nargs: 1
        });
    },
    ({ t, p }) => postie(t, p)
  )
  .command(
    "config",
    "Open the configuration file",
    yargs =>
      yargs
        .option("path", {
          alias: "p",
          type: "string",
          nargs: 1,
          describe: "Default path for markdown files created"
        })
        .option("list", {
          alias: "l",
          type: "array",
          describe: "List all configs"
        }),
    ({ p, l }) => {
      if (l) console.log(config.all);
      else if (p) open(config.path);
      else {
        config.set("outputPath", p);
        console.log("Default path modified");
      }
    }
  )
  .command(
    "template",
    "Create a new template",
    yargs =>
      yargs.option("list", {
        alias: "l",
        type: "list",
        describe: "List all templates"
      }),
    l => {
      if (l) console.log(config.templates);
      else newTemplate();
    }
  )
  .help("h")
  .alias("help", "h")
  .example("$0 -t mytemplate")
  .example("$0 -p ..")
  .example("$0 -p /path/to/your/directory")
  .example("$0 config -p /default/output/directory")
  .example("$0 config -l")
  .usage(
    "Usage: $0 <command> [options]\n Use $0 <command> -h to see available options for each command"
  ).argv;
