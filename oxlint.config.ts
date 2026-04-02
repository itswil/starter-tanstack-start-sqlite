import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["dist/**", "*.min.js", "routeTree.gen.ts"],
});
