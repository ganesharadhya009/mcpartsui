/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
  globals: { "ts-jest": { babelConfig: true, useESM: true } },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // If you use CSS/SCSS imports
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
