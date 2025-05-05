module.exports = {
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    [
      "@babel/preset-env",
      { useBuiltIns: "entry", corejs: "2", targets: { node: "current" } },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["babel-plugin-transform-import-meta"],
};
