# untab

> remove leading whitespace in template strings

## Install

    npm install --save untab

## Usage

```js
const u = require('untab');

function renderHtml(res, model){
  res.write(untab`
    <!doctype html>
    <html>
      <head>
        <title>${model.title}</title>
      </head>
      <body>
        <h1>${model.title}</h1>
      </body>
    </html>
  `);
}

```

## Description

untab will remove the leading whitespace characters from a template string. It will look at the first line and remove as many leading whitespace characters as that line has. This preserves the indentation on the following lines.