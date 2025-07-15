/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import react from "@vitejs/plugin-react";

export default getViteConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // globals: true,
    setupFiles: "./tests/setupTests.ts",
  },
});
