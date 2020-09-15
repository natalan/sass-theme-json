const { isPlainObject } = require("is-plain-object");

function indentsToSpaces(indentCount) {
    return Array(indentCount + 1).join("  ");
}

function _jsToSassString(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;
    
    switch (typeof value) {
    case "boolean":
    case "number":
        return value.toString();
    case "string":
        return value;
    case "object":
        if (isPlainObject(value)) {
            indentLevel += 1;
            const indent = indentsToSpaces(indentLevel);
            
            const jsObj = value;
            let sassKeyValPairs = [];
            
            sassKeyValPairs = Object.keys(jsObj).reduce((result, key) => {
                const jsVal = jsObj[key];
                const sassVal = _jsToSassString(jsVal, indentLevel);
                
                if (typeof sassVal !== "undefined") {
                    result.push(`${key}: ${sassVal}`);
                }
                
                return result;
            }, []);
            
            const result = `(\n${indent + sassKeyValPairs.join(`,\n${indent}`)}\n${indentsToSpaces(indentLevel - 1)})`;
            indentLevel -= 1;
            return result;
        }
        
        if (Array.isArray(value)) {
            const sassVals = value.map((v) => {
                if (typeof v === "undefined") return null;
                return _jsToSassString(v, indentLevel);
            }).filter(Boolean);
            
            return `(${sassVals.join(", ")})`;
        }
        
        if (value === null) {
            return "null";
        }
        
        return value.toString();
    default:
        return void 0;
    }
}

module.exports = (value) => _jsToSassString(value);
