const ConfigStore = require("configstore");
const packagejson = require("../package.json");
const chalk = require("chalk");
const { loadTemplate } = require("./templateUtil");

const defaults = {
  templates: { default: loadTemplate("default") }, // default template
  defaultTemplateFile: "default" // file name of the default template. Used to generate correct questions
};

const config = new ConfigStore(packagejson.name, defaults);

/** Add a new template to the config file */
const addTemplate = filename => {
  config.set(`templates.${filename}`, loadTemplate(filename));
  console.log(
    chalk.green(`Template Created. You can now use postie -t ${filename}`)
  );
};

const setDefaultTemplate = templateName => {
  config.set("templates.default", config.get(`templates.${templateName}`));
  config.set("defaultTemplateFile", templateName);
  console.log(chalk.green(`Default template: ${templateName}`));
};

module.exports = { config, addTemplate, setDefaultTemplate };
