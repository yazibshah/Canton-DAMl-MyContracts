import { useState } from 'react'
import { getParty } from '../api'

interface Props {
  onLogin: (userId: string, party: string, role: 'bank' | 'owner') => void
}

export default function Login({ onLogin }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleLogin(userId: string, role: 'bank' | 'owner') {
    setLoading(true)
    setError('')
    try {
      const party = await getParty(userId)
      onLogin(userId, party, role)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed — is the ledger running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="bank-logo">🏦</div>
        <h1>Meezan Bank</h1>
        <p className="subtitle">DAML Ledger Portal</p>

        {error && <div className="error-box">{error}</div>}

        <div className="login-buttons">
          <button
            className="btn btn-bank"
            disabled={loading}
            onClick={() => handleLogin('meezan', 'bank')}
          >
            Login as Meezan Bank
            <span className="role-badge">BANK</span>
          </button>

          <button
            className="btn btn-owner"
            disabled={loading}
            onClick={() => handleLogin('ali', 'owner')}
          >
            Login as Ali
            <span className="role-badge">ACCOUNT HOLDER</span>
          </button>
        </div>

        {loading && <p className="loading-text">Connecting to ledger...</p>}
      </div>
    </div>
  )
}
