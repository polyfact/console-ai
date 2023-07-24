# AI-Logger

AI-Logger is a Node.js module that enhances console functionality with a new method, `console.ai()`. It utilizes OpenAI's language models to translate error logs into a more readable format, providing potential causes and solutions. By replacing the standard `console.log()` with `console.ai()`, developers can gain insights into complex issues and expedite the debugging process. The original error message is always logged, ensuring data integrity. As such, AI-Logger is a potent tool that not only enhances debugging, but also offers insights into application behavior, thereby improving development efficiency.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install AI-Logger.

```bash
npm install ai-logger
```

## Getting Your PolyFact Token

AI-Logger uses the powerful package called PolyFact to generate AI responses. To use it, you need to get a PolyFact token.

Follow these steps to get your PolyFact token:

1. Go to [app.polyfact.com](https://app.polyfact.com).
2. Connect with GitHub.
3. Copy the token.

Then, you need to export the PolyFact token in your environment:

```bash
export POLYFACT_TOKEN=<your_polyfact_token>
```

## Usage

First, import and initialize the module:

```typescript
import { extendConsole } from "ai-logger";

extendConsole();
```

Now, you can replace your usual `console.log()` or `console.error()` calls with `console.ai()`:

```typescript
try {
  // code that might throw an error
} catch (e) {
  console.ai(e);
}
```

## Features

- Converts error messages into a more understandable format.
- Outlines potential causes of an error.
- Suggests possible solutions.
- Ensures original error messages are logged.

## Options

The `extendConsole()` function can take an `AILoggerOptions` object:

```typescript
extendConsole({
  prompt?: string;
  sections?: ErrorSection[];
  showOriginalError?: boolean;
  showResultWithJsonFormat?: boolean;
});
```

Where:

- `prompt` is a string that instructs the OpenAI model how to format the output.
- `sections` is an array of `ErrorSection` enums. It determines the sections of the output (default is all sections).
- `showOriginalError` is a boolean that indicates whether to log the original error (default is `true`).
- `showResultWithJsonFormat` is a boolean that specifies whether to show the formatted error message in JSON format (default is `false`).

## Contributing

Please make sure to update tests as appropriate.

## License

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)

## Contact

If you want to contact me you can reach me at <kevin@polyfact.com>.

## Author

[kevin-btc](https://github.com/kevin-btc)
