import { expect } from "chai";
import { extendConsole, ErrorSection } from "../src/ai-logger";

describe("extendConsole", function () {
  let consoleSpy: any;

  it("should add ai method to the console object with default options", function () {
    extendConsole();
    expect(console.ai).to.be.a("function");
  });

  it("should add ai method to the console object with custom options", function () {
    const options = {
      prompt: "Custom prompt...",
      sections: [ErrorSection.Error, ErrorSection.Summary],
      showOriginalError: false,
      showResultWithJsonFormat: true,
    };

    extendConsole(options);
    expect(console.ai).to.be.a("function");
  });

  it("should call console.ai with a single Error argument", function (done) {
    extendConsole();
    const testError = new Error("Test Error");
    console.ai(testError);
  });

  it("should throw error if non-Error argument is provided", function (done) {
    extendConsole();
    const nonError = "Non-Error argument";

    console.ai(nonError);
  });

  it("should handle default case for unknown error section", function (done) {
    const options = {
      sections: ["unknown" as ErrorSection],
    };

    extendConsole(options);
    const testError = new Error("Test Error with unknown section");

    console.ai(testError);

    setTimeout(() => {
      expect(consoleSpy.calledOnce).to.be.true;
      done();
    }, 1000);
  });
});
