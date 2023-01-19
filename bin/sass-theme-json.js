#!/usr/bin/env node
import fs from "fs";
import path from "path";
import minimist from "minimist";
import { Readable } from "stream";

import transform from "../index.js";

const argv = minimist(process.argv.slice(2), {
    alias: {
        i: "infile",
        o: "outfile",
        p: "prefix",
        s: "suffix"
    },
    "default": { i: "-", o: "-" }
});

let input;
if (argv.infile === "-") {
    input = process.stdin;
} else if (path.extname(argv.infile) === ".js") {
    input = new Readable();

    const file = await import(path.join(process.cwd(), argv.infile));
    const jsonString = JSON.stringify(file);

    input.push(jsonString);
    input.push(null);
} else {
    input = fs.createReadStream(argv.infile);
}

const output = argv.outfile === "-" ? process.stdout : fs.createWriteStream(argv.outfile);

const opts = {};
if (argv.prefix) {
    opts.prefix = argv.prefix;
}
if (argv.suffix) {
    opts.suffix = argv.suffix;
}

input.pipe(transform(opts)).pipe(output);
