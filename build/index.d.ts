interface OpenAIConfig {
    apiKey?: string;
    apiEndpoint?: string;
    defaultHeaders?: {
        [headerName: string]: string;
    };
    timeout?: number;
}
declare class AIConsole {
    private openai;
    constructor(config?: OpenAIConfig);
    ai(...args: any[]): Promise<void>;
}
export default AIConsole;
