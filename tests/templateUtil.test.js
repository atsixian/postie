const { generateTemplate } = require("../lib/templateUtil.js");

const questionsWithType = [
  { name: "title", type: "input" },
  { name: "excerpt", type: "input" }
];
const questionsWithoutType = [{ name: "title" }];
const questionsWithListType = [{ name: "tags", type: "checkbox" }];

test("Template with 'name' and 'type'", () => {
  expect(generateTemplate(questionsWithType)).toBe(
    "---\ndate: {{date}}\ntitle: {{title}}\nexcerpt: {{excerpt}}\n---"
  );
});

test("Template without specifying 'type' creates 'string' as default", () => {
  expect(generateTemplate(questionsWithoutType)).toBe(
    "---\ndate: {{date}}\ntitle: {{title}}\n---"
  );
});

test("Tempalte with 'checkbox' type creates 'list' type", () => {
  expect(generateTemplate(questionsWithListType)).toBe(
    "---\ndate: {{date}}\ntags:\n{{#tags}}\n  - {{.}}\n{{/tags}}\n---"
  );
});
