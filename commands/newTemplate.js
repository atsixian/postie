const chalk = require("chalk");
const fileUtil = require("../lib/fileUtil");
const question = require("../lib/inquirer");
const { config } = require("../lib/config");

const newTemplate = async () => {
  let res = await question.createTemplate();
  const name = res.templateName;
  const tempName = fileUtil.createTemplateFile(
    name,
    `module.exports = ${res.template}`
  );
  console.log(
    chalk.green(`Template Created. You can now use postie -t ${tempName}`)
  );
  if ((await question.changeDefaultTemplate()).setDefault) {
    config.set("default", config.get(name));
    console.log(chalk.green(`Default template: ${name}`));
  }
};

module.exports = newTemplate;
