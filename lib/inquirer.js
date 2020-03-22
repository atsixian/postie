const inquirer = require("inquirer");
const { resolve } = require("path");
const { config } = require("./config");

// Setup for first use
const setup = () => {
  return inquirer.prompt({
    name: "outputPath",
    type: "input",
    message:
      "Set the default path for future outputs(default: current directory).\nYou can change this with postie config -p /your/path later:\n",
    // if value = "", resolve will return current directory
    filter: value => resolve(value)
  });
};

// Create a file in the current directory
const askPostInfo = async (questionFile = "default") => {
  // no config yet
  let questions;
  try {
    questions = require(`${__dirname}/templates/${questionFile}`);
  } catch (err) {
    console.log(`Please make sure the template "${questionFile}" exists!`);
    process.exit(1);
  }
  if (!config.get("outputPath")) {
    const { outputPath } = await setup();
    config.set("outputPath", outputPath);
  }
  return inquirer.prompt(questions);
};

const openFile = () =>
  inquirer.prompt({
    name: "open",
    type: "confirm",
    message: "Open it now?"
  });

const createTemplate = () =>
  inquirer.prompt([
    {
      name: "templateName",
      type: "input",
      message: "Name of the template: "
    },
    {
      name: "template",
      type: "editor",
      message: "Create your template"
    }
  ]);

const changeDefaultTemplate = () =>
  inquirer.prompt({
    name: "setDefault",
    type: "confirm",
    message: "Do you want to set this template as the default?"
  });

module.exports = {
  askPostInfo,
  openFile,
  createTemplate,
  changeDefaultTemplate
};
