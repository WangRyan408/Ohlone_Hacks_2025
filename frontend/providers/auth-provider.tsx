"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

// Define a simple User type
type User = {
  id: string
  email: string
}

// Hardcoded test users
const TEST_USERS = [
  { email: 'test@example.com', password: 'password123', id: 'user-1' },
  { email: 'therapist@example.com', password: 'password123', id: 'therapist-1' },
]

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        Cookies.remove('user')
      }
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Check if user already exists
      if (TEST_USERS.some(u => u.email === email)) {
        throw new Error('User already exists')
      }
      // In a real app, we would add the user to the database
      // For now, just pretend it worked
      return Promise.resolve()
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const user = TEST_USERS.find(u => u.email === email && u.password === password)
      if (!user) {
        throw new Error('Invalid credentials')
      }
      // Only set the safe user data (exclude password)
      const safeUser = { id: user.id, email: user.email }
      setUser(safeUser)
      // Store user data in cookies
      Cookies.set('user', JSON.stringify(safeUser), { expires: 7 }) // Expires in 7 days
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      setUser(null)
      Cookies.remove('user')
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    // For testing, just sign in as the first test user
    await signIn(TEST_USERS[0].email, TEST_USERS[0].password)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 