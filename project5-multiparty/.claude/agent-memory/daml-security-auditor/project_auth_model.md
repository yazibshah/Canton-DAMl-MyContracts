---
name: project-auth-model
description: Intended signatory/observer/controller model for InterBankTransfer and known design decisions
metadata:
  type: project
---

## InterBankTransfer — Authorization Model (as designed)

- **Signatory**: `senderBank` only. Design intent: senderBank unilaterally initiates and owns the obligation.
  This is a deliberate single-signatory model for the exercise; in production both banks should co-sign.
- **Observers**: `receiverBank`, `sender`, `receiver` — all can see the full contract payload including `amount`.
- **Choice: Approve** — `controller receiverBank`; consuming; re-creates contract with `status = "APPROVED"`.
- **Choice: Reject** — `controller receiverBank`; consuming; re-creates contract with `status = "REJECTED"`.
- **Choice: GetStatus** — `controller sender`; nonconsuming; returns `status` field.
- **Ensure**: `amount > 0.0` enforced at creation.

## Known Design Gaps (recorded from initial audit, 2026-06-09)

1. `senderBank` is the sole signatory — `receiverBank` has no creation-time authorization obligation. Accepted
   as a deliberate exercise simplification. Flag if contract moves toward production use.
2. `status` field is a free-form `Text` with no `ensure`-level constraint — caller can set any string at
   creation, including non-"PENDING" values. Not enforced by the contract.
3. `Approve`/`Reject` re-create without re-checking `ensure amount > 0.0` in the new `create this with`
   expression — the `ensure` clause does re-run on every `create`, so this is safe. Do not re-flag.
4. `GetStatus` is `nonconsuming` — correct, do not flag as an issue.
5. After `Approve`/`Reject`, `receiverBank` can exercise the other choice on the newly created contract
   (double-transition is possible: PENDING -> APPROVED -> REJECTED). No terminal state guard exists.
6. Test script correctly submits create as `meezan` (senderBank) and choices as the controlling party.
   The second `GetStatus` call exercises `transferId` which still holds the pre-Approve contract ID —
   this is a stale-ID bug in the test script (using the old ID after the consuming Approve archived it).
