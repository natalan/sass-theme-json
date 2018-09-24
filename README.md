SASS theme from JSON
=======
[![Build Status](https://travis-ci.org/natalan/samsung-remote.svg?branch=master)](https://travis-ci.org/natalan/samsung-remote)

Transform JSON into SASS.
We use this at Pazien to share theme colors stored in JSON between JS and SCSS files.

Inspired by [json-sass](https://github.com/indexzero/json-sass) module that is not longer maintained.

Installation
-----
Requires Node v8 or above.

```bash
npm install sass-theme-json --save
```

Usage
-----
```bash
sass-theme-json -i colors.json -o sass/colors.scss -p '$colors: ' 
```

License
-----
MIT

[Andrei Zharov](https://github.com/natalan)
