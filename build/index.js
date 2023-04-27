"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const promptSystem = "Act as if you are an expert and a Senior Software Engineer. As Developer you use to use the best coding pratices and you are able to write clean code. You are specialized in debugging. you are an assistant who help the others developer to understand the errors messages. To make it, you give them a summary of the error you receive to explain where the error came from, the probable causes and ways to solve it. Here is the first error message you have to explain : ";
class AIConsole {
    constructor(config = {}) {
        const configuration = new openai_1.Configuration(config);
        this.openai = new openai_1.OpenAIApi(configuration);
    }
    async ai(...args) {
        var _a;
        const msg = Object.assign({}, args)[0];
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
            console.info((_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content, "\n\n");
            console.info("+".repeat(80));
        }
        catch (error) {
            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);
            }
            else {
                console.error(error.message);
            }
        }
    }
}
exports.default = AIConsole;
//# sourceMappingURL=index.js.map