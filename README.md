# Postie

A handy tool to create metadata for your markdown blog posts.

![Demo](./doc/demo.svg)

## Why the name

It sounds cute.

## Installation

`yarn add postie`

## Usage

```
postie

Options:
  --template, -t  Create file with a specific template
  --path, -p      Output directory for markdown files
  --help, -h      Show help
```

**NOTE** Make sure the template used in `postie -t [TEMPLATE]` exists. You can use `postie template -l` to list all templates.

```
postie template

Create a new template

Options:
  --list, -l  List all templates
  --help, -h  Show help
```

```
postie config

Open the configuration file

Options:
  --path, -p   Default output path for markdown files created
  --list, -l   List all configs
  --clear, -c  Clear all configs
  --help, -h   Show help
```

## Create Template

`postie new template`

![create-templae](./doc/newtemplate.svg)

### Format of the template file

Postie asks questions with the help of [ Inquirer.js ](https://github.com/sboudrias/inquirer.js/). And the template for your metadata is generated from your questions. For example, based on `questions` below, Postie will prompt you to fill in `title` and `excerpt`.

```javascript
const questions = [
  {
    name: "title",
    type: "input",
    message: "title: "
  },
  {
    name: "excerpt",
    type: "input",
    message: "excerpt: "
  }
];
```

![example](./doc/example.png)
![output](./doc/example-output.png)

After you run `postie template`, Postie will open the editor, and you should create a question **array** following the format above.

For all possible prompt types, please see [doc for Inquirer.js](https://github.com/SBoudrias/Inquirer.js/#prompt-types).
