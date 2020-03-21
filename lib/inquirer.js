const inquirer = require("inquirer");
const config = require("./config");

// Setup for first use
const setup = () => {
  return inquirer.prompt({
    name: "outputPath",
    type: "input",
    message: "Path for the output(default is the current directory): "
  });
};

// Create a file in the current directory
const askPostInfo = async () => {
  // no config yet
  if (!config.get("configured")) {
    const { outputPath } = await setup();
    console.log(outputPath);
    // config.set("outputPath", outputPath);
    // config.set("configured", true);
  }
  const questions = [
    {
      name: "title",
      type: "input",
      message: "title: ",
      validate: value => {
        if (value.length) {
          return true;
        } else {
          return "Please enter title for you post";
        }
      }
    },
    {
      name: "tags",
      type: "checkbox",
      message: "tags: ",
      choices: ["Algorithm", "Math", "LeetCode"] // TODO: allow new tag option
    },
    {
      name: "excerpt",
      type: "input",
      message: "excerpt: "
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = {
  askPostInfo
};
