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

// const outputPath =
//   "/Users/lisixian/Documents/CS/Website/sixian.li/content/posts";

const defaults = {
  configured: false,
  outputPath: ".",
  template
};
const config = new ConfigStore(packagejson.name, defaults);
module.exports = config;
