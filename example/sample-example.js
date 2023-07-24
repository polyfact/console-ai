"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
var ai_logger_1 = require("ai-logger");
// Export PolyFact token in your environment variables
// Go to https://app.polyfact.com/ to get your token
// shell $> export POLYFACT_TOKEN="<your_polyfact_token>"
// Default configuration
(0, ai_logger_1.extendConsole)();
console.log("Hello World!", ai_logger_1.ErrorSection);
try {
    // Example 1: TypeError
    var obj = void 0;
    console.log(obj.foo);
}
catch (e) {
    console.ai(e);
}
try {
    // Example 2: ReferenceError
    console.log(someUndefinedVariable);
}
catch (e) {
    console.ai(e);
}
// Custom configuration - without original error
(0, ai_logger_1.extendConsole)({
    showOriginalError: false,
});
try {
    // Example 3: SyntaxError
    eval("foo bar");
}
catch (e) {
    console.ai(e);
}
// Custom configuration - specific sections only
(0, ai_logger_1.extendConsole)({
    sections: [ai_logger_1.ErrorSection.Error, ai_logger_1.ErrorSection.Solutions],
});
try {
    // Example 4: RangeError
    new Array(-1);
}
catch (e) {
    console.ai(e);
}
// Custom configuration - JSON format
(0, ai_logger_1.extendConsole)({
    showResultWithJsonFormat: true,
});
try {
    // Example 5: Custom Error
    throw new Error("This is a custom error");
}
catch (e) {
    console.ai(e);
}
