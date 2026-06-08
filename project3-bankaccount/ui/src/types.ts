export interface BankAccountPayload {
  bank: string
  owner: string
  balance: string
}

export interface BankAccountContract {
  contractId: string
  payload: BankAccountPayload
}

export interface ApiError {
  status: number
  errors: string[]
}
