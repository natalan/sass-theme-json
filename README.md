SASS theme from JSON
=======
Transform JSON into SASS.

Use it to share theme colors stored in JSON between JS and SCSS files.

Inspired by [json-sass](https://github.com/indexzero/json-sass) module that is no longer maintained.

Installation
-----
Requires Node v16 or above.

```bash
npm install sass-theme-json --save
```

Usage
-----
```bash
sass-theme-json -i colors.json -o colors.scss -p '$colors: ' 
```

License
-----
MIT

[Andrei Zharov](https://github.com/natalan)
