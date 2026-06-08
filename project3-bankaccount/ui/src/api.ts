import { BankAccountContract } from './types'

const TEMPLATE_ID = '#project3-bankaccount:Main:BankAccount'

async function safeJson(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) throw new Error('No response — is the ledger running? Run: ~/.daml/bin/daml start')
  try { return JSON.parse(text) } catch { throw new Error('Ledger not reachable — run: ~/.daml/bin/daml start') }
}

function cmdId() {
  return `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export async function getParty(userId: string): Promise<string> {
  const res = await fetch(`/v2/users/${userId}`)
  const json = await safeJson(res) as Record<string, unknown>
  if (!res.ok) throw new Error(`User "${userId}" not found — has daml start finished?`)
  const user = json.user as Record<string, unknown>
  return user.primaryParty as string
}

async function getLedgerEnd(): Promise<number> {
  const res = await fetch('/v2/state/ledger-end')
  const json = await safeJson(res) as Record<string, unknown>
  return json.offset as number
}

export async function listAccounts(party: string): Promise<BankAccountContract[]> {
  const offset = await getLedgerEnd()
  const res = await fetch('/v2/state/active-contracts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      activeAtOffset: offset,
      filter: {
        filtersByParty: {
          [party]: { inclusive: { templateFilters: [] } },
        },
      },
    }),
  })
  const items = (await safeJson(res)) as Record<string, unknown>[]
  return items
    .filter(item => {
      const tId = (
        (item?.contractEntry as Record<string, unknown>)
          ?.JsActiveContract as Record<string, unknown>
      )?.createdEvent as Record<string, unknown>
      return (tId?.templateId as string | undefined)?.includes('Main:BankAccount')
    })
    .map(item => {
      const event = (
        (item.contractEntry as Record<string, unknown>)
          .JsActiveContract as Record<string, unknown>
      ).createdEvent as Record<string, unknown>
      return {
        contractId: event.contractId as string,
        payload: event.createArgument as BankAccountContract['payload'],
      }
    })
}

export async function createAccount(
  userId: string,
  bank: string,
  owner: string,
): Promise<void> {
  const res = await fetch('/v2/commands/submit-and-wait', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      commandId: cmdId(),
      actAs: [bank],
      commands: [{
        CreateCommand: {
          templateId: TEMPLATE_ID,
          createArguments: { bank, owner, balance: '0.0' },
        },
      }],
    }),
  })
  const json = await safeJson(res) as Record<string, unknown>
  if (json.code) throw new Error(json.cause as string ?? String(json.code))
}

export async function deposit(
  userId: string,
  actAsParty: string,
  contractId: string,
  amount: number,
): Promise<void> {
  const res = await fetch('/v2/commands/submit-and-wait', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      commandId: cmdId(),
      actAs: [actAsParty],
      commands: [{
        ExerciseCommand: {
          templateId: TEMPLATE_ID,
          contractId,
          choice: 'Deposit',
          choiceArgument: { amount: amount.toFixed(2) },
        },
      }],
    }),
  })
  const json = await safeJson(res) as Record<string, unknown>
  if (json.code) throw new Error(json.cause as string ?? String(json.code))
}

export async function withdraw(
  userId: string,
  actAsParty: string,
  contractId: string,
  amount: number,
): Promise<void> {
  const res = await fetch('/v2/commands/submit-and-wait', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      commandId: cmdId(),
      actAs: [actAsParty],
      commands: [{
        ExerciseCommand: {
          templateId: TEMPLATE_ID,
          contractId,
          choice: 'Withdraw',
          choiceArgument: { amount: amount.toFixed(2) },
        },
      }],
    }),
  })
  const json = await safeJson(res) as Record<string, unknown>
  if (json.code) throw new Error(json.cause as string ?? String(json.code))
}
