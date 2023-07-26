// @ts-nocheck

import { extendConsole, ErrorSection } from "../src";

// Export PolyFact token in your environment variables
// Go to https://app.polyfact.com/ to get your token
// shell $> export POLYFACT_TOKEN="<your_polyfact_token>"

// Default configuration
extendConsole();

console.log("Hello World!", ErrorSection);

try {
  // Example 1: TypeError
  let obj: any;
  console.log(obj.foo);
} catch (e) {
  console.ai(e);
}

try {
  // Example 2: ReferenceError
  console.log(someUndefinedVariable);
} catch (e) {
  console.ai(e);
}

// Custom configuration - without original error
extendConsole({
  showOriginalError: false,
});

try {
  // Example 3: SyntaxError
  eval("foo bar");
} catch (e) {
  console.ai(e);
}

// Custom configuration - specific sections only
extendConsole({
  sections: [ErrorSection.Error, ErrorSection.Solutions],
});

try {
  // Example 4: RangeError
  new Array(-1);
} catch (e) {
  console.ai(e);
}

// Custom configuration - JSON format
extendConsole({
  showResultWithJsonFormat: true,
});

try {
  // Example 5: Custom Error
  throw new Error("This is a custom error");
} catch (e) {
  console.ai(e);
}
