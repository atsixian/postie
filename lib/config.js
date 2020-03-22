const ConfigStore = require("configstore");
const packagejson = require("../package.json");
const { loadTemplate } = require("./templateUtil");

const defaults = {
  configured: false,
  default: loadTemplate("default") // default template
};

const config = new ConfigStore(packagejson.name, defaults);

/** Add a new template to the config file */
addTemplate = filename => {
  config.set(filename, loadTemplate(filename));
};

module.exports = { config, addTemplate };
