export function getApiError(error, fallbackMessage) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === "ERR_NETWORK") {
    return "Backend API is not running. Start the server on http://localhost:5000.";
  }

  return fallbackMessage;
}

