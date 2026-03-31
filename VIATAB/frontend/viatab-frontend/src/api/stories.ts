import { axiosInstance } from './axios'
import type { PagedResponse, Story, StoryForm } from '../types'

export async function fetchStories(): Promise<PagedResponse<Story>> {
  const response = await axiosInstance.get<PagedResponse<Story>>('/stories?page=0&size=30&sortBy=createdAt&sortDir=desc')
  return response.data
}

export async function fetchMyStories(): Promise<PagedResponse<Story>> {
  const response = await axiosInstance.get<PagedResponse<Story>>('/stories/mine?page=0&size=30&sortBy=createdAt&sortDir=desc')
  return response.data
}

export async function createStory(payload: StoryForm): Promise<Story> {
  const response = await axiosInstance.post<Story>('/stories', payload)
  return response.data
}

export async function updateStory(id: number, payload: StoryForm): Promise<Story> {
  const response = await axiosInstance.put<Story>(`/stories/${id}`, payload)
  return response.data
}

export async function deleteStory(id: number): Promise<void> {
  await axiosInstance.delete(`/stories/${id}`)
}
