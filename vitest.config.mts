///<reference types="@testing-library/react" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import magicalSvg from "vite-plugin-magical-svg";

export default defineConfig({
  plugins: [react(), magicalSvg({ target: "react" })],
  test: {
    globals: true,
    environment: "jsdom",
    alias: {
      "~/": new URL("./src/", import.meta.url).pathname,
      "public/": new URL("./public/", import.meta.url).pathname,
    },
    setupFiles: ["./vitest.setup.mts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**"],
      exclude: ["*.d.ts", "**/__test__/**"],
    },
  },
});
