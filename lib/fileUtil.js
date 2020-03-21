const { writeFile } = require("fs");
const { resolve } = require("path");
const { render } = require("mustache");
const config = require("./config");

const getFileName = title => title.toLowerCase().replace(/\s+/g, "-");

/** Create a file with a specific template */
const createFile = ans => {
  const content = render(config.get("template"), ans);
  const filePath = `${resolve(config.get("outputPath"))}/${
    ans.date
  }-${getFileName(ans.title)}.md`;
  writeFile(filePath, content, err => {
    if (err) throw err;
  });
  return filePath;
};

module.exports = {
  createFile
};
