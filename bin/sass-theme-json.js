#!/usr/bin/env node
import { promises, createReadStream, createWriteStream, readFileSync } from "fs";
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
    console.log("No file provided. Using stdin for input:");
    input = process.stdin;
} else if (path.extname(argv.infile) === ".js") {
    input = new Readable();
    console.log(`Reading JS file at ${path.join(process.cwd(), argv.infile)}`);
    const res = await import(path.join(process.cwd(), argv.infile)).catch((err) => {
        console.error("Unable to read the file", err);
    });
    const jsonString = JSON.stringify(res.toString());
    input.push(jsonString);
    input.push(null);
} else if (path.extname(argv.infile) === ".json") {
    input = new Readable();
    console.log(`Reading JSON file at ${path.join(process.cwd(), argv.infile)}`);
    const res = await promises.readFile(path.join(process.cwd(), argv.infile)).catch((err) => {
        console.error("Unable to read the file", err);
    });
    try {
        const jsonString = JSON.stringify(res.toString());
        input.push(jsonString);
        input.push(null);
    } catch (err) {
        console.error("Unable to stringify file content", err);
    }
} else {
    console.log(`Reading stream as ${argv.infile}`);
    input = createReadStream(argv.infile);
    console.log("Read file", input);
}

const output = argv.outfile === "-" ? process.stdout : createWriteStream(path.join(process.cwd(), argv.outfile));

const opts = {};
if (argv.prefix) {
    opts.prefix = argv.prefix;
}
if (argv.suffix) {
    opts.suffix = argv.suffix;
}

console.log("Streaming result to output", output?.path);
input.pipe(transform(opts)).pipe(output);
