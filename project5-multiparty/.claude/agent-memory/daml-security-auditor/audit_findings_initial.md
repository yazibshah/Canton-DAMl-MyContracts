---
name: audit-findings-initial
description: All findings from the first full security audit of project5-multiparty (2026-06-09)
metadata:
  type: project
---

## Audit Date: 2026-06-09

### Findings Summary

| # | Severity | Category | Location | Short Description |
|---|----------|----------|----------|-------------------|
| 1 | High | Authorization | Main.daml:13 | Single-signatory: senderBank creates unilaterally, receiverBank bears no creation-time obligation |
| 2 | Medium | Lifecycle | Main.daml:16-26 | No terminal-state guard — receiverBank can transition APPROVED -> REJECTED or REJECTED -> APPROVED |
| 3 | Medium | Authorization | Main.daml:10 | status field is caller-settable free-form Text; no ensure constraint prevents invalid initial status |
| 4 | Medium | Privacy | Main.daml:14 | `amount` exposed to all four parties including `sender` and `receiver` — may be intentional but is a leak in real banking |
| 5 | Low | Correctness | Test.daml:35 | Stale ContractId: second GetStatus call reuses `transferId` bound before Approve archived the contract |
| 6 | Low | Correctness | Test.daml:25-38 | Test does not exercise Reject path or verify that unauthorized parties cannot exercise choices |
| 7 | Informational | Authorization | Main.daml:13 | senderBank-only signatory: no co-authorization by receiverBank at creation |

### False Positive Notes
- `ensure amount > 0.0` DOES re-run on re-create (DAML always evaluates ensure on every create), so no bypass via Approve/Reject.
- GetStatus being nonconsuming is correct and should not be flagged.
