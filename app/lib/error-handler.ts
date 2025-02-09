import { AxiosError } from "axios"

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    // Network error (server unreachable)
    if (!error.response) {
      return "Unable to reach the server. Please check your connection and try again."
    }

    // Server errors
    switch (error.response.status) {
      case 401:
        return "Please log in to continue."
      case 403:
        return "You don't have permission to perform this action."
      case 404:
        return "The requested resource was not found."
      case 429:
        return "Too many requests. Please try again later."
      case 500:
        return "Something went wrong on our end. Please try again later."
      default:
        return"An unexpected error occurred."
    }
  }

  // Generic error message
  return "Something went wrong. Please try again."
}

