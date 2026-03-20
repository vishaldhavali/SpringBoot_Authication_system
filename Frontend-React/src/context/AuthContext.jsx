import { createContext, useState, useCallback, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)

  const checkAuth = useCallback(async () => {
    try {
      setIsCheckingAuth(true)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/user`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setUser(data)
        return true
      } else {
        setUser(null)
        return false
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      return false
    } finally {
      setIsCheckingAuth(false)
    }
  }, [])

  useEffect(() => {
    checkAuth().then(() => setIsLoading(false))
  }, [checkAuth])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isCheckingAuth,
    checkAuth,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
