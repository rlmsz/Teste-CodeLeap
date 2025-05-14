import axios, { AxiosError } from 'axios'

const API = 'https://dev.codeleap.co.uk/careers/'

export type ServerPost = {
  id: number
  username: string
  created_datetime: string    
  title: string
  content: string
}


export async function fetchPosts(): Promise<ServerPost[]> {
  try {
    const response = await axios.get(API)
    return response.data.results
  } catch (error) {
    const errorMsg = error instanceof AxiosError 
      ? `Failed to fetch posts: ${error.message}`
      : 'Failed to fetch posts'
    throw new Error(errorMsg)
  }
}


export async function createPost(data: Omit<ServerPost, 'id' | 'created_datetime'>): Promise<ServerPost> {
  try {
    const response = await axios.post(API, data)
    return response.data
  } catch (error) {
    const errorMsg = error instanceof AxiosError 
      ? `Failed to create post: ${error.message}`
      : 'Failed to create post'
    throw new Error(errorMsg)
  }
}


export async function deletePost(id: number): Promise<boolean> {
  try {
    await axios.delete(`${API}${id}/`)
    return true
  } catch (error) {
    const errorMsg = error instanceof AxiosError 
      ? `Failed to delete post: ${error.message}`
      : 'Failed to delete post'
    throw new Error(errorMsg)
  }
}

export async function editPost(
  id: number, 
  data: Partial<Pick<ServerPost, 'title' | 'content'>>
): Promise<ServerPost> {
  try {
    const response = await axios.patch(`${API}${id}/`, data)
    return response.data
  } catch (error) {
    const errorMsg = error instanceof AxiosError 
      ? `Failed to edit post: ${error.message}`
      : 'Failed to edit post'
    throw new Error(errorMsg)
  }
}