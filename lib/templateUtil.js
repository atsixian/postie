const config = require("./config");

/** A helper method to validate a required field */
const validate = value => {
  if (value) {
    return true;
  } else {
    return `This field is required`;
  }
};

// Want to generate metadata template based on questions
const generateTemplate = questions => {
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
    console.error(error, "Please check your template file");
  }
};

/** Create template from a given file */
const loadTemplate = filename => {
  const questions = require(`./templates/${filename}`);
  return generateTemplate(questions);
};

/** Add a new template to the config file */
const addTemplate = filename => {
  config.set(filename, loadTemplate(filename));
};

module.exports = {
  validate,
  generateTemplate,
  loadTemplate,
  addTemplate
};
