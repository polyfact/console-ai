"use strict";

import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

config();

const promptSystem =
  "Act as if you are an expert and a Senior Software Engineer. As Developer you use to use the best coding pratices and you are able to write clean code. You are specialized in debugging. you are an assistant who help the others developer to understand the errors messages. To make it, you give them a summary of the error you receive to explain where the error came from, the probable causes and ways to solve it. Here is the first error message you have to explain : ";

interface OpenAIConfig {
  apiKey?: string;
  apiEndpoint?: string;
  defaultHeaders?: { [headerName: string]: string };
  timeout?: number;
}

class AIConsole {
  private openai: OpenAIApi;

  constructor(config: OpenAIConfig = {}) {
    const configuration = new Configuration(config);
    this.openai = new OpenAIApi(configuration);
  }

  public async ai(...args: any[]): Promise<void> {
    const msg: string = { ...args }[0];

    try {
      console.error(...args);
      console.info("+".repeat(80));
      console.info("\n\nLoading readable error message...");

      const completion = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: promptSystem },
          { role: "user", content: msg.toString() },
        ],
        max_tokens: 500,
      });

      console.info(completion.data.choices[0].message?.content, "\n\n");

      console.info("+".repeat(80));
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }
}
