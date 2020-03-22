const ConfigStore = require("configstore");
const packagejson = require("../package.json");
const { loadTemplate } = require("./templateUtil");

const defaults = {
  configured: false,
  default: loadTemplate("default") // default template
};
const config = new ConfigStore(packagejson.name, defaults);
module.exports = config;
