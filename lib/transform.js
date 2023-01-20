import through from "through2";

import { jsToSassString } from "./toSassString.js";

export const jsonSass = (opts) => {
    const options = {
        prefix: "",
        suffix: ";",
        ...opts
    };
    
    return through(function(chunk, enc, callback) {
        let jsValue;
        try {
            jsValue = JSON.parse(chunk);
            this.push(`${options.prefix}${jsToSassString(jsValue)}${options.suffix}`);
            callback();
        } catch (err) {
            callback(err);
        }
    });
};
