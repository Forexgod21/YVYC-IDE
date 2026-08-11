# YVYC-IDE — PATCH LEDGER

Numbered register of every deviation from upstream. Governed by Fork Doctrine §2.
Ceiling: **eight active L4 patches** (Doctrine §1.5).

**Active L4 patches: 0 / 8**
**Proposed entries: 7 — awaiting operator ruling. No code applied for any entry below.**

Baseline note: the 2026-08-11 clean compile was performed on a Linux x64 Codespace
container. It verifies toolchain/source coherence only. GATE-01 (clean build on
macOS arm64, §8.2) is **not yet satisfied**.

---

### PATCH-0001 — Exclude bundled Copilot Chat extension
- Layer:              L3
- Status:             proposed — awaiting ruling
- Introduced:         (not yet applied)
- Upstream anchor:    1.132.0
- Files touched:      build packaging configuration (exclusion applied at package time via `yvyc/build/`; `extensions/copilot/` source tree NOT deleted). Upstream `package.json` `compile-copilot` script bypassed in YVYC build path, not edited.
- Patch file:         n/a — build-time exclusion, no upstream file modified
- Capability:         The shipped editor contains no Copilot Chat: no chat sign-in prompts, no AI panel wired to Microsoft/GitHub services.
- Higher-layer attempt: n/a — exclusion of a bundled extension is natively L3; no higher layer exists for not-shipping a component.
- Blast radius:       Core chat surfaces that expect a default chat agent may render empty or hidden states (interacts with PATCH-0007). No other extension in the shipped set depends on it.
- Upstream fragility: Upstream build scripts hardcode copilot compile/package steps (`compile-copilot`); renames or new copilot-adjacent bundles reopen this entry.
- Re-verification:    1) Produce a packaged build for the target platform. 2) `test ! -d <app>/resources/app/extensions/copilot` → must pass. 3) Launch with a fresh profile; Extensions view lists no Copilot entry; no GitHub/Copilot sign-in prompt appears during a 10-minute edit session.
- Last verified:      never

### PATCH-0002 — Exclude bundled Microsoft account authentication
- Layer:              L3
- Status:             proposed — awaiting ruling
- Upstream anchor:    1.132.0
- Files touched:      build packaging configuration (`extensions/microsoft-authentication/` not deleted)
- Patch file:         n/a — build-time exclusion
- Capability:         The shipped editor offers no Microsoft account sign-in anywhere.
- Higher-layer attempt: n/a — natively L3.
- Blast radius:       Settings Sync backed by Microsoft accounts becomes unavailable (acceptable: YVYC-IDE does not ship Microsoft-account services). Nothing else in the post-cut extension set requests Microsoft auth.
- Upstream fragility: New upstream features assuming Microsoft-account presence (e.g. sync onboarding flows) may surface dead entry points; caught by re-verification step 3.
- Re-verification:    1) Packaged build. 2) `test ! -d <app>/resources/app/extensions/microsoft-authentication`. 3) Fresh-profile launch: Accounts menu shows no Microsoft sign-in provider.
- Last verified:      never

### PATCH-0003 — Exclude bundled GitHub integration extension
- Layer:              L3
- Status:             proposed — awaiting ruling
- Upstream anchor:    1.132.0
- Files touched:      build packaging configuration (`extensions/github/` not deleted)
- Patch file:         n/a — build-time exclusion
- Capability:         No GitHub-specific publish/PR/issue features in the shipped editor.
- Higher-layer attempt: n/a — natively L3.
- Blast radius:       "Publish to GitHub" and GitHub remote-browsing affordances disappear from the git UI. `extensions/git` and `extensions/git-base` are UNTOUCHED — clone, commit, branch, push, pull all ship fully intact.
- Upstream fragility: git extension may grow soft references to the github extension; watch for dangling commands in the Source Control view after merges.
- Re-verification:    1) Packaged build. 2) `test ! -d <app>/resources/app/extensions/github`. 3) Fresh profile: init a repo, commit; Source Control view functions; no "Publish to GitHub" action present.
- Last verified:      never

### PATCH-0004 — Exclude bundled GitHub authentication provider
- Layer:              L3
- Status:             proposed — awaiting ruling
- Upstream anchor:    1.132.0
- Files touched:      build packaging configuration (`extensions/github-authentication/` not deleted)
- Patch file:         n/a — build-time exclusion
- Capability:         The shipped editor never initiates a GitHub OAuth flow.
- Higher-layer attempt: n/a — natively L3.
- Blast radius:       HONEST COST: pushing to github.com from the built-in git UI loses the OAuth popup path; operators authenticate via SSH keys or a personal access token instead. Documented in the welcome flow before any distribution.
- Upstream fragility: Same soft-reference risk as PATCH-0003.
- Re-verification:    1) Packaged build. 2) `test ! -d <app>/resources/app/extensions/github-authentication`. 3) Fresh profile: Accounts menu shows no GitHub provider; git push to an SSH remote succeeds.
- Last verified:      never

### PATCH-0005 — Telemetry strip (§3.4: stripped, not disabled)
- Layer:              L3 (build-time product identity merge; escalates to L4 only if the GATE-04 scan proves residual endpoints, via a new ledger entry)
- Status:             proposed — awaiting ruling
- Upstream anchor:    1.132.0
- Files touched:      product.json at build time only (via `yvyc/build/apply-identity.cjs`, which already removes `aiConfig`, `telemetryConnectionString`, `agentsTelemetryAppName`; upstream file never hand-edited). GATE-04 scan script to be added at `yvyc/build/` — the scan is the guarantee.
- Patch file:         n/a unless scan findings force an L4 entry
- Capability:         No build of this product reports anything to Microsoft telemetry endpoints — architecturally, not as a setting.
- Higher-layer attempt: Key/endpoint omission at build-time merge IS the highest-layer mechanism; GATE-04 scan verifies sufficiency. L4 reserved strictly for scan-proven residual phone-home.
- Blast radius:       None user-visible. Experimentation/flighting features dependent on telemetry config stay inert.
- Upstream fragility: Field names and endpoint constants move between releases; the scan (asserting on hostnames in build output, e.g. `*.data.microsoft.com`, `dc.services.visualstudio.com`, `vortex.*`, 1DS collector hosts) catches renames the field-strip misses.
- Re-verification:    1) Packaged build with identity applied. 2) Run GATE-04 scan over build output: zero matches for the Microsoft telemetry hostname list. 3) `python3 -c "import json;p=json.load(open('<app>/resources/app/product.json'));assert 'aiConfig' not in p and 'telemetryConnectionString' not in p"`.
- Last verified:      never

### PATCH-0006 — Microsoft internal dev tooling verified out of shipped builds
- Layer:              L3 (verification-only entry)
- Status:             proposed — awaiting ruling
- Upstream anchor:    1.132.0
- Files touched:      none — `.vscode/extensions/` (vscode-pr-pinger, selfhost test tools) and `test/` are development-workspace tooling upstream's packaging already omits; this entry pins that assumption to a gate check instead of trusting it.
- Patch file:         n/a
- Capability:         Nothing from Microsoft's internal development workflow ships in the product.
- Higher-layer attempt: n/a — verification entry.
- Blast radius:       None; dev-only tooling.
- Upstream fragility: A future upstream packaging change promoting a dev tool into the shipped set would silently violate the assumption; the re-verification step exists for exactly that.
- Re-verification:    1) Packaged build. 2) `test ! -d <app>/resources/app/.vscode` and confirm no `vscode-pr-pinger`/selfhost-* directories anywhere under `<app>/resources/app/extensions/`.
- Last verified:      never

### PATCH-0007 — In-core chat/AI surface dormancy (CANDIDATE — not an exclusion)
- Layer:              higher-layer attempt in progress; L3/L4 NOT authorized. If a core patch is ultimately required it consumes one of the eight §1.5 slots.
- Status:             candidate — higher-layer attempt not yet verified
- Upstream anchor:    1.132.0
- Files touched:      none in `src/vs/` at this time. Chat/AI surfaces live in `src/vs/workbench/contrib/chat/` (core), NOT in `extensions/` — the exclude method does not apply and no one should pretend it does.
- Patch file:         none authorized
- Capability:         No chat panel, AI affordance, or voice surface appears anywhere in the shipped editor's chrome (Laws 3 and 5).
- Higher-layer attempt: (1) `apply-identity.cjs` omits `defaultChatAgent`, `agentsTelemetryAppName`, `voiceWsUrl` from merged product.json — implemented, effect on UI unverified. (2) L1 default settings hiding chat views where settings exist — not yet attempted. VERIFICATION REQUIRED: launch an identity-applied build, fresh profile, and record which chat surfaces remain visible. Only a named, verified API gap after both attempts opens an L3/L4 scoping conversation, per §1.4.
- Blast radius:       (to be scoped if promotion is ever justified — workbench layout, view registry, keybindings referencing chat commands)
- Upstream fragility: Upstream is actively expanding in-core AI surface area every release; this is the highest-drift region of the codebase and the likeliest recurring cost in every future merge.
- Re-verification:    1) Identity-applied build, fresh profile. 2) Scripted first-run: no chat view in any panel/sidebar, no AI command in command palette top results, no voice affordance. 3) Record surviving surfaces in this entry before any layer-descent discussion.
- Last verified:      never

---

*Entries above are drafts for ruling. Per §2.3 rule 1 no code lands without a governing entry; per operator instruction 2026-08-11, no entry activates without the operator's own written ruling.*
