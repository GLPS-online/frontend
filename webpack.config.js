export const entry = {
  dev: "./src/index.tsx",
};
export const output = {
  filename: "./build/index.js",
};
export const devtool = "source-map";
export const resolve = {
  extensions: [".ts", ".tsx", ".js", ".jsx"],
};
export const module = {
  loaders: [
    // Typescript
    { test: /\.tsx?$/, loader: "ts-loader" },
  ],
};
