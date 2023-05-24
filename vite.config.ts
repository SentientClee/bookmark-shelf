import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "popup.html"),
        background: path.resolve(__dirname, "src/background/main.ts"),
      },
      output: {
        dir: "dist",
        format: "esm",
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/chunks/[name]-[hash].js",
      },
      external: ["lib/browser-polyfill.min.js"],
    },
  },
});
