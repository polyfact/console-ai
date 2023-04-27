# AI Console

AI Console is a powerful debugging tool that extends the built-in console object in Node.js, using OpenAI's GPT-4 language model to generate human-readable error messages and potential solutions. This module can help developers of all skill levels more effectively understand and resolve complex issues within their codebase.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example](#example)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Installation

To install the `ai-console` package, run the following command:

```
npm install ai-console
```

## Usage

After installing the `ai-console` package, you can import it in your Node.js application like this:

```javascript
import AIConsole from "ai-console";
```

To create an instance of AIConsole, you need to provide an `OpenAIConfig` object, which includes your OpenAI API key and endpoint:

```javascript
const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  apiEndpoint: "https://api.openai.com/v1/chat/completions",
};

const Console = new AIConsole(openAIConfig);
```

Now, you can use the `Console.ai()` method instead of `console.log()` or `console.error()` to log error messages and receive human-readable logs with possible solutions.

## Configuration

The `OpenAIConfig` object allows you to configure the following properties:

- `apiKey` (string): Your OpenAI API key.
- `apiEndpoint` (string): The OpenAI API endpoint (default: "https://api.openai.com/v1/chat/completions").
- `defaultHeaders` (object): An optional object containing custom headers for the API requests.
- `timeout` (number): The request timeout in milliseconds.

## Example

Here's an example of how to use the AIConsole:

```javascript
import AIConsole from "ai-console";

const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  apiEndpoint: "https://api.openai.com/v1/chat/completions",
};

const Console = new AIConsole(openAIConfig);

// ... your code ...

try {
  // ... some code that might throw an error ...
} catch (error) {
  Console.ai(error);
}
```

## Dependencies

- `dotenv` (v16.0.3): Load environment variables from a `.env` file.
- `openai` (v3.2.1): Official OpenAI API client for JavaScript.

## License

This project is licensed under the CC0 1.0 Universal License. For more information, see the [LICENSE](./LICENSE) file.

## Contributing

We welcome contributions to the `ai-console` project. If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## Author

This project was created by kevin-btc. If you have any questions or need assistance, please feel free to reach out on GitHub.
