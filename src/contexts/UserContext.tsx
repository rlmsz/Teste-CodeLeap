// UserContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react'

type UserContextType = {
  username: string
  setUsername: (name: string) => void
  hasUsername: boolean
  setHasUsername: (has: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState('')
  const [hasUsername, setHasUsername] = useState(false)
  
  return (
    <UserContext.Provider value={{ username, setUsername, hasUsername, setHasUsername }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}