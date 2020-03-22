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
  const questions = require(`${__dirname}/templates/${filename}`);
  return generateTemplate(questions);
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
    console.error(error, "Please check your template file");
    process.exit(1);
  }
}

module.exports = {
  validate,
  generateTemplate,
  loadTemplate
};
