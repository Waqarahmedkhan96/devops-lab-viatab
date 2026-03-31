export type Department = 'SOFTWARE_ENGINEERING' | 'BUSINESS' | 'CONSTRUCTION'
export type StoryStatus = 'DRAFT' | 'PUBLISHED'

export interface AuthResponse {
  accessToken: string
  tokenType: string
  userId: number
  email: string
  roles: string[]
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
}

export interface UserProfile {
  id: number
  fullName: string
  email: string
  roles: string[]
  joinedAt: string
}

export interface Story {
  id: number
  title: string
  caption: string
  content: string
  department: Department
  status: StoryStatus
  imageUrl: string
  category: string
  authorId: number
  authorName: string
  createdAt: string
  updatedAt: string
}

export interface StoryForm {
  title: string
  caption: string
  content: string
  department: Department
  status: StoryStatus
  imageUrl: string
  category: string
}

export interface PagedResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface ApiErrorResponse {
  timestamp?: string
  status?: number
  error?: string
  message?: string
  path?: string
  validationErrors?: Record<string, string>
}