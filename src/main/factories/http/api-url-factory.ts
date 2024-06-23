export const makeApiUrl = (path: string): URL => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  return new URL(path, baseUrl)
}
