import mock from "mock-fs";
import fs from "fs";

import { jsonSass } from "../lib/transform";

describe("json to sass", () => {
    beforeEach(() => {
        mock({
            "test/theme.json": `{
                "green-dark": "#29918a",
                "green-mid": "#42aaa3",
                "green-light": "#69c5bd",
                "green-soft": "#69c5bd"
            }`
        });
    });
    
    afterEach(() => {
        mock.restore();
    });
    
    test("should transform json to sass", (done) => {
        let result = "";
        fs.createReadStream("test/theme.json")
            .pipe(jsonSass({
                prefix: "$colors: "
            }))
            .on("data", (buf) => {
                result = `${result}${buf.toString()}`;
            })
            .on("end", () => {
                const expected = "$colors: (\n  green-dark: #29918a,\n  green-mid: #42aaa3,\n  green-light: #69c5bd,\n  green-soft: #69c5bd\n);";
                expect(result).toEqual(expected);
                done();
            });
    });
});
