import { BuildOptions } from "esbuild";

export default {
  target: [
    "chrome109",
    "ios14.5",
    "safari15.6",
    "edge114",
    "firefox114",
    "opera99",
  ],
  entryPoints: [
    "src/index.css",
    "src/index.ts",
    "src/page.css",
    "src/page.ts",
    "src/styles/materialdesignicons.min.css",
    "src/archive.css"
  ],
  outdir: "source",
  bundle: true,
  splitting: true,
  format: "esm",
  treeShaking: true,
  loader: {
    ".woff": "copy",
    ".woff2": "copy",
    ".ttf": "copy",
    ".eot": "copy",
    ".svg": "file",
  },
  sourcemap: "linked",
  jsx: "preserve",
  jsxImportSource: "solid-js",
  minify: true,
} as BuildOptions;
