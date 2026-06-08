import { useEffect, useState, useCallback } from 'react'
import { BankAccountContract } from '../types'
import { listAccounts, createAccount } from '../api'
import AccountCard from './AccountCard'

interface Props {
  userId: string
  party: string
  role: 'bank' | 'owner'
  onLogout: () => void
}

export default function Dashboard({ userId, party, role, onLogout }: Props) {
  const [accounts, setAccounts]     = useState<BankAccountContract[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [ownerParty, setOwnerParty] = useState('')
  const [creating, setCreating]     = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setAccounts(await listAccounts(party))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }, [party])

  useEffect(() => { refresh() }, [refresh])

  async function handleCreate() {
    if (!ownerParty.trim()) { setError('Enter the owner party ID'); return }
    setCreating(true)
    setError('')
    try {
      await createAccount(userId, party, ownerParty.trim())
      setOwnerParty('')
      setShowCreate(false)
      await refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to create account')
    } finally {
      setCreating(false)
    }
  }

  const shortParty = party.split('::')[0]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <span className="bank-name">🏦 Meezan Bank</span>
          <span className={`role-pill ${role}`}>{role === 'bank' ? 'Bank Officer' : 'Account Holder'}</span>
        </div>
        <div className="header-right">
          <span className="party-label">{shortParty}</span>
          <button className="btn btn-outline" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="section-title-row">
          <h2>Bank Accounts</h2>
          <div className="header-actions">
            <button className="btn btn-ghost" onClick={refresh} disabled={loading}>↺ Refresh</button>
            {role === 'bank' && (
              <button className="btn btn-bank" onClick={() => setShowCreate(v => !v)}>
                {showCreate ? '✕ Cancel' : '+ New Account'}
              </button>
            )}
          </div>
        </div>

        {showCreate && role === 'bank' && (
          <div className="create-panel">
            <h3>Open New Account</h3>
            <p className="hint">
              Paste Ali's full party ID — it looks like <code>Ali::1220...</code><br/>
              You can copy it from the ledger startup log or from Ali's dashboard header.
            </p>
            <input
              className="amount-input wide"
              type="text"
              placeholder="Ali::1220a1ac54ea49aaf5db5ef501c31..."
              value={ownerParty}
              onChange={e => setOwnerParty(e.target.value)}
            />
            <button className="btn btn-bank" disabled={creating} onClick={handleCreate}>
              {creating ? 'Creating…' : 'Create Account'}
            </button>
          </div>
        )}

        {error && <div className="error-box">{error}</div>}

        {loading ? (
          <div className="loading-text">Loading accounts…</div>
        ) : accounts.length === 0 ? (
          <div className="empty-state">
            <span>📭</span>
            <p>No bank accounts found on the ledger.</p>
            {role === 'bank' && <p>Click <strong>+ New Account</strong> to create one.</p>}
          </div>
        ) : (
          <div className="accounts-grid">
            {accounts.map(acc => (
              <AccountCard
                key={acc.contractId}
                contract={acc}
                userId={userId}
                party={party}
                role={role}
                onRefresh={refresh}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
