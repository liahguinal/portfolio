import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const CREDENTIALS = {
  username: 'amg9223',
  password: '@amg9223',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return sessionStorage.getItem('amg_auth') === 'true' ? true : null
  })

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      sessionStorage.setItem('amg_auth', 'true')
      setUser(true)
      return { error: null }
    }
    return { error: 'Invalid username or password.' }
  }

  const logout = () => {
    sessionStorage.removeItem('amg_auth')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
