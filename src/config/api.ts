const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const apiMethod = import.meta.env.VITE_API_METHOD

if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not set. Create a .env file in the project root and restart the Vite dev server.",
  )
}

export { apiBaseUrl, apiMethod }
