# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A DAML smart-contract project modeling a **multi-party inter-bank money
transfer**. A single contract binds four parties (two banks, two customers)
with distinct authorization rights — the core lesson is DAML's
signatory/observer/controller model. Built with DAML SDK `3.4.11` (`daml.yaml`).

## Commands

The `daml` CLI is not on PATH in this environment; install the DAML SDK to run these.

- `daml build` — compile the project (artifacts go to git-ignored `.daml/`).
- `daml test` — run all DAML Script tests.
- `daml test --files daml/Test.daml` — run a single test file.
- `daml start` — build, then launch the sandbox ledger + Navigator UI.
- `daml studio` — open in VS Code with the DAML IDE extension.

## Architecture

Two source files under `daml/`:

- **`Main.daml`** — the `InterBankTransfer` template. This is the whole data
  model. `senderBank` is the sole **signatory** (authorizes/owns the contract);
  `receiverBank`, `sender`, and `receiver` are **observers** (can see it but
  not create it). Authorization to act is split by choice: `receiverBank`
  controls `Approve`/`Reject`, while `sender` controls the read-only
  `GetStatus`. The contract has no mutable state — `Approve`/`Reject` are
  *consuming* choices that archive the current contract and `create` a fresh one
  with an updated `status` (`"PENDING"` → `"APPROVED"`/`"REJECTED"`). `GetStatus`
  is *nonconsuming*, so reading the status leaves the contract intact. `ensure
  amount > 0.0` is enforced at creation.

- **`Test.daml`** — `test_interbank`, a DAML Script that drives the full
  lifecycle: allocate four parties (banks Meezan/HBL, customers Ali/Sara),
  `submit` a create as `senderBank`, then `submit` choice exercises as the
  controlling party. Note that each party must `submit` only the choices it
  controls — this is how the authorization model is verified end to end.

## Conventions

- Part of a numbered DAML exercise series ("project5"); keep changes scoped to
  the multi-party authorization concept.
- Match existing style: 2-space indentation, aligned fields in `with` blocks.
- `*.daml` files are tagged as Haskell for GitHub highlighting (`.gitattributes`).
