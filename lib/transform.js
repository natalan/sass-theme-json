const through = require("through2");

const toSassString = require("./toSassString");

module.exports = function jsonSass(opts) {
    const options = {
        prefix: "",
        suffix: ";",
        ...opts
    };
    
    return through(function(chunk, enc, callback) {
        let jsValue;
        try {
            jsValue = JSON.parse(chunk);
            this.push(`${options.prefix}${toSassString(jsValue)}${options.suffix}`);
            callback();
        } catch (err) {
            callback(err);
        }
    });
};
