import { generateWithType, t } from "polyfact";

import { TypeOf } from "io-ts";

declare global {
  interface Console {
    ai: (...args: any[]) => void;
  }
}

export enum ErrorSection {
  Error = "error",
  Location = "location",
  Summary = "summary",
  Causes = "causes",
  Solutions = "solutions",
}

interface AILoggerOptions {
  prompt?: string;
  sections?: ErrorSection[];
  showOriginalError?: boolean;
  showResultWithJsonFormat?: boolean;
}

const promptSystem = `
You are an expert and a senior software engineer. 
Your task is to explain an error message to a developer using concise and precise bullet points. 
As an experienced developer, you are well-versed in using best coding practices and writing clean code, with a specialization in debugging. 
Your role is to assist other developers in understanding error messages by providing a summary of the error, including its source, probable causes, and potential solutions.
`;

const location = t.type({
  file: t.string.description(
    "Insert here the file path where the error occurred"
  ),
  line: t.number.description(
    "Insert here the line number where the error occurred"
  ),
});

const ErrorCodec = t.type({
  error: t.string.description("Summarize the error message here"),
  location,
  summary: t.string.description(
    "Summarize the error message here with. be concise and precise with relevant information"
  ),
  causes: t
    .array(t.string)
    .description(
      "List the probable causes of the error here. be concise and precise with relevant information"
    ),
  solutions: t
    .array(t.string)
    .description(
      "List the possible solutions to the error here. If you have more than one solution, list them in order of priority, with the most likely solution first. Give example for how to implement the solutions. Do it with 100 words"
    ),
});

const ResponseError = ErrorCodec;

export type TResponseError = TypeOf<typeof ResponseError>;

function formatError(json: TResponseError, sections: ErrorSection[] = []) {
  const horizontalLine =
    "-----------------------------------------------------------";

  let formattedError = `\n${horizontalLine}\n`;

  sections.forEach((section) => {
    switch (section) {
      case ErrorSection.Error:
        formattedError += `Error:\n  ${json.error}\n\n`;
        break;
      case ErrorSection.Location:
        formattedError += `Location:\n  File: ${json.location.file}\n  Line: ${json.location.line}\n\n`;
        break;
      case ErrorSection.Summary:
        formattedError += `Summary:\n  ${json.summary}\n\n`;
        break;
      case ErrorSection.Causes:
        formattedError += `Probable Causes:\n  - ${json.causes.join(
          "\n  - "
        )}\n\n`;
        break;
      case ErrorSection.Solutions:
        formattedError += `Possible Solutions:\n  - ${json.solutions.join(
          "\n  - "
        )}\n\n`;
        break;
    }
  });

  return formattedError;
}

function handleError(error: any) {
  if (error && error.response) {
    console.error("AI Logger Error: ", error.response.status);
    console.error("AI Logger Error Data: ", error.response.data);
  } else if (error && error.message) {
    console.error("AI Logger Error: ", error.message);
  } else {
    console.error("AI Logger Error: An unknown error occurred.");
  }
}

export function ai({
  prompt,
  sections,
  showOriginalError,
  showResultWithJsonFormat,
}: AILoggerOptions) {
  return async function (...args: any[]) {
    if (!args || args.length === 0) {
      console.error("AI Logger Error: No arguments provided.");
      return;
    }

    const msg = args[0];

    if (!(msg instanceof Error)) {
      console.error(
        "AI Logger Error: The argument provided is not an instance of Error."
      );
      return;
    }
    if (showOriginalError) {
      console.error("Original Error : ", msg);
    }

    console.info("\n\nLoading readable error message...");

    const newPrompt = prompt + "\n" + msg + "\n" + msg.stack;

    try {
      const completion = await generateWithType(newPrompt, ResponseError);

      if (showResultWithJsonFormat) {
        console.info(completion);
      } else {
        const formatedError = formatError(completion, sections);
        console.error(formatedError);
      }
    } catch (error) {
      console.log("AI Logger Error: ", error);
      handleError(error);
    }
  };
}

export function extendConsole(options: AILoggerOptions = {}) {
  const {
    prompt = promptSystem,
    sections = [
      ErrorSection.Error,
      ErrorSection.Location,
      ErrorSection.Summary,
      ErrorSection.Causes,
      ErrorSection.Solutions,
    ],
    showOriginalError = true,
    showResultWithJsonFormat = false,
  } = options;

  console.ai = ai({
    prompt,
    sections,
    showOriginalError,
    showResultWithJsonFormat,
  });
}
