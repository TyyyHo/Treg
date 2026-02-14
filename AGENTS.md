# AGENTS.md

## Project rules

### Branching & commits

- 一律從 main 切 feature branch：feat/<topic> 或 fix/<topic>
- 每個任務至少 1 個 commit，訊息格式：<type>: <summary>
- 禁止直接改 main

### Commands to validate changes

- JS/TS: pnpm lint && pnpm test
- 變更前後都要看 git diff --staged，確保沒有混入無關變更

### Commands to validate changes (required before commit)

- 必跑：pnpm format -> pnpm lint:check -> pnpm type-check
- 若任一失敗：先修到通過再 commit
- commit 前必看：git diff --staged（確保無混入變更）

### Git workflow

- 從 main 切 feat/_ 或 fix/_ 分支
- 允許在分支上 commit（可多次小 commit）
- 禁止直接改 main（用 PR 合併）

### Devlopment rules

- 每次完成任務，都要commit。
- 如果任務規模大，將任務差分成多個commit，確保能夠review / reset / revert。
