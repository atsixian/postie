const { writeFile } = require("fs");
const { resolve } = require("path");
const { render } = require("mustache");
const { config, addTemplate } = require("./config");

const getFileName = title => title.toLowerCase().replace(/\s+/g, "-");

/** Create a file with a specific template */
const createFile = (ans, template, path) => {
  // render with default template if no template is provided
  try {
    const content = render(config.get(template || "default"), ans);
    const dir = path || config.get("outputPath");
    const filePath = `${resolve(dir)}/${ans.date}-${getFileName(ans.title)}.md`;

    writeFile(filePath, content, err => {
      if (err) throw err;
    });
    return filePath;
  } catch (err) {
    console.error(`Please make sure the template "${template}" exists!`);
    process.exit(1);
  }
};

const createTemplateFile = (templateName, content) => {
  writeFile(
    resolve(`${__dirname}/templates/${templateName}.js`),
    content,
    err => {
      if (err) throw err;
      // make sure to add the file after the it is saved
      addTemplate(templateName);
    }
  );
  return templateName;
};

module.exports = {
  createFile,
  createTemplateFile
};
