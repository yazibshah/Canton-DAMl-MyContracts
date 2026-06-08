import { useState } from 'react'
import { BankAccountContract } from '../types'
import { deposit, withdraw } from '../api'

interface Props {
  contract: BankAccountContract
  userId: string
  party: string
  role: 'bank' | 'owner'
  onRefresh: () => void
}

export default function AccountCard({ contract, userId, party, role, onRefresh }: Props) {
  const { contractId, payload } = contract
  const [amount, setAmount]     = useState('')
  const [busy, setBusy]         = useState(false)
  const [error, setError]       = useState('')

  const balance = parseFloat(payload.balance)
  const shortId = (id: string) => id.split('::')[0]

  async function doAction(action: 'deposit' | 'withdraw') {
    const num = parseFloat(amount)
    if (!num || num <= 0) { setError('Enter a positive amount'); return }
    setBusy(true)
    setError('')
    try {
      if (action === 'deposit') await deposit(userId, party, contractId, num)
      else                      await withdraw(userId, party, contractId, num)
      setAmount('')
      onRefresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Transaction failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="account-card">
      <div className="account-header">
        <div className="account-icon">💳</div>
        <div className="account-ids">
          <div className="account-id-row">
            <span className="label">Bank</span>
            <span className="party-id">{shortId(payload.bank)}</span>
          </div>
          <div className="account-id-row">
            <span className="label">Owner</span>
            <span className="party-id">{shortId(payload.owner)}</span>
          </div>
        </div>
      </div>

      <div className="balance-section">
        <span className="balance-label">Balance</span>
        <span className="balance-amount">
          PKR {balance.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="contract-id">
        <span className="label">Contract ID</span>
        <span className="contract-hash">{contractId.slice(0, 20)}…</span>
      </div>

      {error && <div className="error-box small">{error}</div>}

      <div className="actions">
        <input
          type="number"
          className="amount-input"
          placeholder="Amount (PKR)"
          value={amount}
          min="0.01"
          step="0.01"
          onChange={e => { setAmount(e.target.value); setError('') }}
        />

        {role === 'bank' && (
          <button className="btn btn-deposit" disabled={busy} onClick={() => doAction('deposit')}>
            {busy ? '…' : '↑ Deposit'}
          </button>
        )}

        {role === 'owner' && (
          <button
            className="btn btn-withdraw"
            disabled={busy || balance <= 0}
            onClick={() => doAction('withdraw')}
          >
            {busy ? '…' : '↓ Withdraw'}
          </button>
        )}
      </div>
    </div>
  )
}
