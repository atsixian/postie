const fileUtil = require("../lib/fileUtil");
const question = require("../lib/inquirer");
const { setDefaultTemplate } = require("../lib/config");

const newTemplate = async () => {
  let res = await question.createTemplate();
  const name = res.templateName;
  fileUtil.createTemplateFile(name, `module.exports = ${res.template}`);
  if ((await question.changeDefaultTemplate()).setDefault) {
    setDefaultTemplate(name);
  }
};

module.exports = newTemplate;
