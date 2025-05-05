import { ESLint } from "eslint";
import TestConstants from "../modules/global/constants/testConstants";


if (typeof globalThis.structuredClone !== TestConstants.FUNCTION) {
  globalThis.structuredClone = (obj: unknown) =>
    JSON.parse(JSON.stringify(obj));
}


describe(TestConstants.ESLINT_TEST_NAME, () => {
  let eslint: ESLint;

  beforeAll(() => {
    eslint = new ESLint({
      overrideConfigFile: "./eslint.config.js",
    });
  });

  const runESLint = async (code: string) => {
    const results = await eslint.lintText(code, {
      filePath: TestConstants.TEST_ENV_FILE_PATH,
    });
    return results[0];
  };

  test(TestConstants.ESLINT_TEST_CASE_1, async () => {
    const code = `
      const example = 42;
      console.log('Hello World');
    `;
    const result = await runESLint(code);

    expect(result.warningCount).toBe(1);
    expect(result.messages[0].ruleId).toBe("@typescript-eslint/no-unused-vars");
  });

  test(TestConstants.ESLINT_TEST_CASE_2, async () => {
    const code = `
      import { useEffect, useState } from 'react';
      const App = () => {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
          console.log(count);
          setCount(2)
        }, []); 
      };
      export default App;
    `;
    const result = await runESLint(code);

    expect(result.warningCount).toBe(1);
    expect(result.messages[0].ruleId).toBe("react-hooks/exhaustive-deps");
  });

  test(TestConstants.ESLINT_TEST_CASE_3, async () => {
    const code = `
      const example = 42; 
      console.log(example);
    `;
    const result = await runESLint(code);

    expect(result.warningCount).toBe(0);
  });

  test(TestConstants.ESLINT_TEST_CASE_4, async () => {
    const code = `
      import React from 'react';
      const App = () => <div>Hello World</div>;
    `;
    const result = await runESLint(code);

    expect(result.errorCount).toBe(0);
  });

  test(TestConstants.ESLINT_TEST_CASE_5, async () => {
    const code = `
      import { useEffect } from 'react';
      const App = () => {
        let someVar;
        useEffect(() => {
          console.log(someVar);
        }, []); 
      };
      export default App;
    `;
    const result = await runESLint(code);

    expect(result.warningCount).toBe(1);
    expect(result.messages[0].ruleId).toBe("react-hooks/exhaustive-deps");
  });
});
