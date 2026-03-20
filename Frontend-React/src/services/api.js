const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const defaultOptions = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.message || 'API request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  register: async (username, email, password) => {
    const response = await fetch(`${API_URL}/api/register`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    })
    return handleResponse(response)
  },

  verifyEmail: async (email, otp) => {
    const response = await fetch(`${API_URL}/api/verify-email`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    })
    return handleResponse(response)
  },

  login: async (username, password) => {
    const response = await fetch(`${API_URL}/api/login`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    return handleResponse(response)
  },

  resendOtp: async (email) => {
    const response = await fetch(`${API_URL}/api/resend-otp`, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    return handleResponse(response)
  },

  getUser: async () => {
    const response = await fetch(`${API_URL}/api/user`, {
      ...defaultOptions,
      method: 'GET',
    })
    return handleResponse(response)
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/api/logout`, {
        ...defaultOptions,
        method: 'POST',
      })
      return handleResponse(response)
    } catch (error) {
      // If logout endpoint doesn't exist, treat as success
      if (error.status === 404) {
        return { message: 'Logged out' }
      }
      throw error
    }
  },
}
