import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

interface Session {
  userId: string
  party: string
  role: 'bank' | 'owner'
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  if (!session) {
    return (
      <Login
        onLogin={(userId, party, role) => setSession({ userId, party, role })}
      />
    )
  }

  return (
    <Dashboard
      userId={session.userId}
      party={session.party}
      role={session.role}
      onLogout={() => setSession(null)}
    />
  )
}
