const ConfigStore = require("configstore");
const packagejson = require("../package.json");

const template = `---
title: {{title}}
date: {{date}}
tags:
{{#tags}}
  - {{.}}
{{/tags}}
excerpt: {{excerpt}}
---`;

const defaults = {
  configured: false,
  template
};
const config = new ConfigStore(packagejson.name, defaults);
module.exports = config;
