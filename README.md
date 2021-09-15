<h1 align="center">Devastator Robot using Johnny-five</h1>
<h3 align="center">📟🍭Quick use of the devastator robot platform from Dfrobot using johnny-five</h3>


## Synopsis

Printing Simple Table on your bash terminal. Its useful when you want to present some tables on console. There is a library that you can use similar way in nodejs/typescript Projects. [console-table-printer](https://www.npmjs.com/package/console-table-printer)

## Installation

```bash
npm install table-printer-cli -g
```

## Basic Example

Try this on your terminal.

```bash
ctp -i '[{ "id":3, "text":"like" }, {"id":4, "text":"tea"}]'
```

Output:

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/table-printer-cli@master/static-resources/quick-print.v3.png)

You can also pipe the input from stdin

```bash
echo '[{ "id":3, "text":"like" }, {"id":4, "text":"tea"}]' | ctp -s
```

## Detailed usage

```text
Usage: ctp [options]

Options:
  -i, --input <value>  input string
  -s, --stdin          read input from stdin
  -h, --help           display help for command
```

## License

[MIT](https://github.com/devinpearson/devastator/blob/master/LICENSE)