import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'src/**/cypress/integration/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    supportFile: 'src/main/__test__/cypress/support/e2e.ts',
    fixturesFolder: false,
  },
})
