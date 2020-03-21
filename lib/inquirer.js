const inquirer = require("inquirer");
const { resolve } = require("path");
const config = require("./config");

// Setup for first use
const setup = () => {
  return inquirer.prompt({
    name: "outputPath",
    type: "input",
    message: "Path for the output(default: current directory): ",
    // if value = "", resolve will return current directory
    filter: value => resolve(value)
  });
};

// Create a file in the current directory
const askPostInfo = async () => {
  // no config yet
  if (!config.get("configured")) {
    const { outputPath } = await setup();
    if (outputPath) {
      config.set("outputPath", outputPath);
    }
    config.set("configured", true);
  }
  const questions = [
    {
      name: "title",
      type: "input",
      message: "title: ",
      validate: value => {
        if (value) {
          return true;
        } else {
          return "Please enter title for you post";
        }
      },
      // Convert to title case
      filter: value => {
        if (value) {
          return value
            .toLowerCase()
            .split(" ")
            .map(s => s[0].toUpperCase() + s.substring(1))
            .join(" ");
        }
      }
    },
    {
      name: "tags",
      type: "checkbox",
      message: "tags: ",
      choices: ["Algorithm", "Math", "LeetCode"]
    },
    {
      name: "excerpt",
      type: "input",
      message: "excerpt: "
    }
  ];
  return inquirer.prompt(questions);
};

const openFile = () =>
  inquirer.prompt({
    name: "open",
    type: "confirm",
    message: "Do you want to open it?"
  });

module.exports = {
  askPostInfo,
  openFile
};
