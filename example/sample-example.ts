// @ts-nocheck

import { extendConsole } from "../src";

extendConsole();

(function () {
  try {
    const testObject = { name: "Test Object" };
    const doesNotExist = testObject.property.doesNotExist;
  } catch (e) {
    console.ai(e);
  }
})();
