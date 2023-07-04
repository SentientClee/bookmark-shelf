import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import css from "rollup-plugin-import-css";
import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig([
  {
    input: "src/popup/main.ts",
    output: {
      file: "public/assets/popup.js",
      sourcemap: true,
    },
    plugins: [
      svelte({
        preprocess: preprocess(),
      }),
      css(),
      resolve(),
    ],
  },
  {
    input: "src/background/main.ts",
    output: {
      file: "public/assets/background.js",
      sourcemap: true,
    },
    plugins: [typescript({ allowImportingTsExtensions: false })],
  },
]);
