const toSassString = require("../lib/toSassString");

describe("JS to Sass", () => {
    let foo;
    
    beforeEach(() => {
        function Foo() {
            this.toString = () => "bar";
        }
    
        foo = new Foo();
    });
    
    test("should handle strings", () => {
        expect(toSassString("foo")).toEqual("foo");
        expect(toSassString(JSON.stringify("bar"))).toEqual("\"bar\"");
    });
    
    test("should handle booleans", () => {
        expect(toSassString(true)).toEqual("true");
        expect(toSassString(false)).toEqual("false");
    });
    
    test("should handle null", () => {
        expect(toSassString(null)).toEqual("null");
    });
    
    test("should ignore undefined", () => {
        expect(toSassString(void 0)).toBeUndefined();
    });
    
    test("should ignore functions", () => {
        expect(toSassString(() => {})).toBeUndefined();
    });
    
    test("should use value of `.toString()` for non-plain objects", () => {
        expect(toSassString(foo)).toEqual("bar");
    });
    
    test("should convert arrays to lists", () => {
        expect(toSassString([1, 2, 3])).toEqual("(1, 2, 3)");
    });
    
    test("should convert objects to maps, with indentation", () => {
        const obj = {
            foo: "bar",
            bar: {
                baz: "foo"
            }
        };
        
        expect(toSassString(obj)).toEqual("(\n  foo: bar,\n  bar: (\n    baz: foo\n  )\n)");
    });
});
