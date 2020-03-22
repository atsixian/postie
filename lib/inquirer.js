const inquirer = require("inquirer");
const { resolve } = require("path");
const config = require("./config");

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
  try {
    const questions = require(`${__dirname}/templates/${questionFile}`);
    if (!config.get("configured")) {
      const { outputPath } = await setup();
      if (outputPath) {
        config.set("outputPath", outputPath);
        config.set("configured", true);
      }
    }
    return inquirer.prompt(questions);
  } catch (err) {
    console.log(`Please make sure the template "${questionFile}" exists!`);
    process.exit(1);
  }
};

const openFile = () =>
  inquirer.prompt({
    name: "open",
    type: "confirm",
    message: "Open it now?"
  });

module.exports = {
  askPostInfo,
  openFile
};
