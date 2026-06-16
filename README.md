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
