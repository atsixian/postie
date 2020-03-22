const { validate } = require("../templateUtil");

/** Metadata that you need should be configured here */
const questions = [
  {
    name: "title",
    type: "input",
    message: "title: ",
    validate: validate,
    // Convert to title case
    filter: value => {
      if (value) {
        return value
          .toLowerCase()
          .split(" ")
          .map(s => s[0].toUpperCase() + s.substring(1))
          .join(" ");
      }
    }
  },
  {
    name: "excerpt",
    type: "input",
    message: "excerpt: "
  }
];

module.exports = questions;
