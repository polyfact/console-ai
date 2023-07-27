# Console.ia

Console.ia is a Node.js module that enhances console functionality with a new method, `console.ai()`. It utilizes OpenAI's language models to translate error logs into a more readable format, providing potential causes and solutions. By replacing the standard `console.log()` with `console.ai()`, developers can gain insights into complex issues and expedite the debugging process. The original error message can be logged, if you want ensuring data integrity. As such, Console.ia is a potent tool that not only enhances debugging, but also offers insights into application behavior, thereby improving development efficiency.

![console.ia](https://n42-nft.s3.eu-west-3.amazonaws.com/logger-ai.png)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Console.ia.

```bash

npm  install  console.ia

```

## Getting Your PolyFact Token

Console.ia uses the powerful package called PolyFact to generate AI responses. To use it, you need to get a PolyFact token.

Follow these steps to get your PolyFact token:

1. Go to [app.polyfact.com](https://app.polyfact.com).

2. Connect with GitHub.

3. Copy the token.

Then, you need to export the PolyFact token in your environment:

```bash

export  POLYFACT_TOKEN=<your_polyfact_token>

```

## Usage

First, import and initialize the module:

```typescript
import { extendConsole } from "console.ia";

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

prompt?:  string;

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

## Section Display Configuration

You can customize the output of error information using the `sections` array, which accepts values of the `ErrorSection` enum. Each enum value corresponds to a different aspect of the error information:

- `ErrorSection.Error`: This displays the actual error message or code.

- `ErrorSection.Location`: This shows the file, function, or location where the error occurred.

- `ErrorSection.Summary`: This provides a brief explanation or summary of the error.

- `ErrorSection.Causes`: This lists the possible causes that may have led to the error.

- `ErrorSection.Solutions`: This suggests potential solutions or fixes for the error.

By default, all sections will be displayed if the `sections` array is not specified. However, you can choose to display only certain sections by explicitly specifying them in the `sections` array.

Here is an example on how to do this:

typescriptCopy code

`const sections: ErrorSection[] = [ErrorSection.Error, ErrorSection.Location];`

In this case, the output will only display the error message/code and its location. Any section not included in the `sections` array will not be displayed in the output. Adjust this array to suit the error information needs of your application.

## Contributing

Please make sure to update tests as appropriate.

## License

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)

## Contact

If you want to contact me you can reach me at <kevin@polyfact.com>.

## Author

[kevin-btc](https://github.com/kevin-btc)
