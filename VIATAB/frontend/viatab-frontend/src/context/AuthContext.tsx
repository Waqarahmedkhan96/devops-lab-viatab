/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCurrentUser, login as loginRequest, register as registerRequest } from '../api/auth'
import { axiosInstance } from '../api/axios'
import type { LoginPayload, RegisterPayload, UserProfile } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const TOKEN_KEY = 'viatab_token'

interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

const defaultState: AuthContextValue = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
}

export const AuthContext = createContext<AuthContextValue>(defaultState)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
        const profile = await fetchCurrentUser()
        setUser(profile)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        delete axiosInstance.defaults.headers.common.Authorization
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [token])

  const login = async (payload: LoginPayload) => {
    try {
      setError(null)

      const response = await loginRequest(payload)
      localStorage.setItem(TOKEN_KEY, response.accessToken)
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`
      setToken(response.accessToken)

      const profile = await fetchCurrentUser()
      setUser(profile)

      navigate('/stories', { replace: true })
    } catch (error) {
      const message = getApiErrorMessage(error, 'Unable to login. Check your credentials.')
      setError(message)
      throw error
    }
  }

  const register = async (payload: RegisterPayload) => {
    try {
      setError(null)

      const response = await registerRequest(payload)
      localStorage.setItem(TOKEN_KEY, response.accessToken)
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`
      setToken(response.accessToken)

      const profile = await fetchCurrentUser()
      setUser(profile)

      navigate('/stories', { replace: true })
    } catch (error) {
      const message = getApiErrorMessage(error, 'Unable to register. Please try again.')
      setError(message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    delete axiosInstance.defaults.headers.common.Authorization
    setToken(null)
    setUser(null)
    setError(null)
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}