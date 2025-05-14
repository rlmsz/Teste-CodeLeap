
export interface Post {
  id?: number
  username: string
  created_datetime?: string    // ISO-string from the API
  title: string
  content: string
}
