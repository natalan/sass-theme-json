import { jsToSassString } from "../lib/toSassString";

describe("JS to Sass", () => {
    let foo;
    
    beforeEach(() => {
        function Foo() {
            this.toString = () => "bar";
        }
    
        foo = new Foo();
    });
    
    test("should handle strings", () => {
        expect(jsToSassString("foo")).toEqual("foo");
        expect(jsToSassString(JSON.stringify("bar"))).toEqual("\"bar\"");
    });
    
    test("should handle booleans", () => {
        expect(jsToSassString(true)).toEqual("true");
        expect(jsToSassString(false)).toEqual("false");
    });
    
    test("should handle null", () => {
        expect(jsToSassString(null)).toEqual("null");
    });
    
    test("should ignore undefined", () => {
        expect(jsToSassString(void 0)).toBeUndefined();
    });
    
    test("should ignore functions", () => {
        expect(jsToSassString(() => {})).toBeUndefined();
    });
    
    test("should use value of `.toString()` for non-plain objects", () => {
        expect(jsToSassString(foo)).toEqual("bar");
    });
    
    test("should convert arrays to lists", () => {
        expect(jsToSassString([1, 2, 3])).toEqual("(1, 2, 3)");
    });
    
    test("should convert objects to maps, with indentation", () => {
        const obj = {
            foo: "bar",
            bar: {
                baz: "foo"
            }
        };
        
        expect(jsToSassString(obj)).toEqual("(\n  foo: bar,\n  bar: (\n    baz: foo\n  )\n)");
    });
});
