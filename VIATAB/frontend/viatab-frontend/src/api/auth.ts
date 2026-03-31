import { axiosInstance } from './axios'
import type { AuthResponse, LoginPayload, RegisterPayload, UserProfile } from '../types'

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', payload)
  return response.data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', payload)
  return response.data
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  const response = await axiosInstance.get<UserProfile>('/auth/me')
  return response.data
}
