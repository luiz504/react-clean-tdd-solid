import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/integration/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    fixturesFolder: false,
  },
})
