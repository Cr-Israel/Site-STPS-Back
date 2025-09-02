import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
    },
  },
  plugins: [tsconfigPaths()],
});