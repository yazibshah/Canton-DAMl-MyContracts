# Canton DAML Learning Projects

A collection of small DAML smart-contract projects built while learning Daml and the Canton ledger. Each project lives in its own folder with its own `daml.yaml` and test scripts, and builds on concepts from the previous one.

All projects use **Daml SDK 3.4.11**.

## Projects

| # | Project | What it covers |
|---|---------|----------------|
| 1 | [project1-helloworld](project1-helloworld/) | A minimal `HelloWorld` template — templates, signatories, and the basic project layout. |
| 2 | [project2-simpleasset](project2-simpleasset/) | A `SimpleAsset` with a `Transfer` choice — ownership and consuming choices. |
| 3 | [project3-bankaccount](project3-bankaccount/) | A `BankAccount` with `Deposit`/`Withdraw` choices, plus a React + Vite UI (`ui/`) talking to the ledger. |
| 4 | [project4-transfer](project4-transfer/) | Extends the bank account with a `Transfer` choice moving funds between accounts. |
| 5 | [project5-multiparty](project5-multiparty/) | An `InterBankTransfer` workflow with `Approve`/`Reject` choices — multi-party authorization across banks. |
| 6 | [project6-stablecoin](project6-stablecoin/) | A `PKRCoin` stablecoin with `Transfer`, `Split`, and `Burn` choices — issuer/owner roles and coin lifecycle. |
| 7 | [project7-propose-accept](project7-propose-accept/) | The propose-accept pattern: a `CoinProposal` the receiver can `Accept` or `RejectProposal`, and the sender can `Withdraw` — transfers without requiring both parties' authority up front. |
| 8 | [project8-wallet](project8-wallet/) | A `Wallet` with `Credit`/`Debit` choices and a nonconsuming `CheckBalance` — custom `Currency` enum and `AccountInfo` record types, plus the bank signatory / owner observer split. |
| 9 | [project9-license](project9-license/) | A time-based `License` with `Renew` and `Revoke` choices and a nonconsuming `IsValid` — working with `Time`, `getTime`, and `addRelTime` for expiry logic. |
| 10 | [project10-escrow](project10-escrow/) | An `Escrow` signed by buyer and agent with `Release`/`Refund` choices — a neutral third party as co-signatory, and a `status` field guarding state transitions. |
| 11 | [project11-loan](project11-loan/) | A `LoanApplication` moving through `ManagerApprove` → `RiskApprove` → `Disburse` — a multi-step approval workflow driven by a `LoanStatus` enum. |
| 13 | [project13-keys](project13-keys/) | A `BankAccount` plus an `AccountRegistry` holding a pointer to the current account contract — keeping a stable handle to a contract that is recreated on every choice. |
| 14 | [project14-collections](project14-collections/) | A `BankLedger` keeping every customer balance in one `Map Party Decimal` — `DA.Map` insert/lookup/size and `DA.Optional` defaults. |
| 15 | [project15-interfaces](project15-interfaces/) | An `IToken` interface with a `TokenView` viewtype, implemented by both `PKRCoin` and `USDCoin` — one shared `Transfer` choice across different templates. |
| 16 | [project16-interface-advanced](project16-interface-advanced/) | An `IAsset` interface implemented by `PKRCoin`, `GoldToken`, and `BondToken` — interface-level choices (`TransferAsset`, `GetInfo`) and computed view values. |
| 17 | [project17-digital-bank](project17-digital-bank/) | A capstone digital bank: KYC records with expiry, an `IAsset` interface over PKR and gold, propose-accept transfers, asset merging, and a `Map`-backed customer registry. |
| 18 | [project18-exceptions](project18-exceptions/) | Custom `exception` types (`InsufficientFunds`, `AccountFrozen`) with `throw`, and a `SafeWithdraw` choice using `try`/`catch` — error handling inside choices. |
| 19 | [project19-insurance](project19-insurance/) | An `IPolicy` interface over `HealthPolicy` and `AutoPolicy` with a full claim workflow — `ClaimProposal` → `Claim` moving through a `ClaimStatus` enum, an `InvalidClaim` exception, and a `ClaimsRegistry`. |
| 20 | [project20-composition](project20-composition/) | A `Vault` holding a list of `ContractId Asset` references — contract composition with `mapA fetch`, plus pure helper functions (`calculateFee`, `totalWithFee`) reused by nonconsuming `TotalValue`/`TotalWithFees` choices. |
| 21 | [project21-marketplace](project21-marketplace/) | A capstone marketplace: an `IProduct` interface, propose-accept ordering (`OrderProposal` → `Order`) through an `OrderStatus` lifecycle, an `OutOfStock` exception, and `Catalog` / `RatingsRegistry` collections. |
| 22 | [project22-delegation](project22-delegation/) | A `Delegation` template letting a delegate spend on the principal's behalf up to a limit, an N-of-M `MultiSigProposal` collecting approvals in a `[Party]` list before `Execute`, and an admin-managed `Whitelist` — delegated authority and list-based access control. |

## Getting started

Prerequisites: the [Daml SDK](https://docs.daml.com/getting-started/installation.html) (3.4.11) and, for the project 3 UI, Node.js.

Build and test any project:

```bash
cd project6-stablecoin
daml build
daml test
```

Run an interactive sandbox ledger:

```bash
daml start
```

Run the bank account UI (project 3):

```bash
cd project3-bankaccount/ui
npm install
npm run dev
```

## Layout

Each project follows the standard Daml structure:

```
projectN-name/
├── daml.yaml          # project config (name, version, SDK, dependencies)
└── daml/
    ├── Main.daml      # templates and choices
    └── Test.daml      # Daml Script tests
```
