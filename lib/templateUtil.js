const { copyFile } = require("fs");
const path = require("path");
const { changeDefaultTemplate } = require("./inquirer");
/** A helper method to validate a required field */
const validate = value => {
  if (value) {
    return true;
  } else {
    return `This field is required`;
  }
};

/** Create template from a given file */
function loadTemplate(filename) {
  try {
    const questions = require(`${__dirname}/templates/${filename}`);
    return generateTemplate(questions);
  } catch (err) {
    console.err(err);
  }
}

// Want to generate metadata template based on questions
function generateTemplate(questions) {
  let result = "---\ndate: {{date}}\n";
  try {
    questions.forEach(question => {
      let temp;
      const name = question.name;
      if (question.type === "checkbox") {
        temp = `${name}:\n{{#${name}}}\n  - {{.}}\n{{/${name}}}\n`;
      } else {
        temp = `${name}: {{${name}}}\n`;
      }
      result += temp;
    });
    result += "---";
    return result;
  } catch (error) {
    console.error("Please check the format of your template file");
    process.exit(1);
  }
}

function importTemplate(filePath) {
  const { addTemplate } = require("./config");
  const templateFile = path.basename(filePath);
  copyFile(
    path.resolve(filePath),
    `${__dirname}/templates/${templateFile}`,
    async err => {
      if (err) throw err;
      const name = templateFile.split(".")[0];
      const { setDefaultTemplate } = require("./config");

      addTemplate(name); // remove extension
      if ((await changeDefaultTemplate()).setDefault) {
        setDefaultTemplate(name);
      }
    }
  );
}

module.exports = {
  validate,
  generateTemplate,
  loadTemplate,
  importTemplate
};
