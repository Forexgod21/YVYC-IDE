# YVYC-IDE — FORK DOCTRINE

**Document ID:** `YVYC-IDE-FORK-DOCTRINE-v1_0.md`
**Registry entry:** #40 — Category XII → reclassified **Category III, Developer Tooling** on fork
**Status:** Sealed v1.0
**Upstream base:** Code-OSS (Microsoft Visual Studio Code, MIT License)
**Authority:** Governs all build, patch, branding, distribution, and merge activity for YVYC-IDE
**Operator:** Cade Picasso · Chief Operating Systems Architect · YourVisionYourCreation LLC
**Sealed:** 2026-08-10

---

## 0 — THESIS AND SCOPE

### 0.1 What YVYC-IDE is

An accessibility-native development environment. Disability-accessible across the board, with engineering weight concentrated on people who live with traumatic brain injury and PTSD — the founder among them. Built around cognitive load, trauma response, and sensory regulation as first-order design constraints, not retrofitted after the fact.

No existing IDE is built from the ground up for this audience. Accessibility in every shipping editor is a compliance layer bolted onto a product designed for a neurotypical operator with intact working memory, intact startle regulation, and unlimited tolerance for visual noise. YVYC-IDE inverts the order: calm is the default configuration, not a mode you enable.

### 0.2 What the moat is

The moat is not the fork. Anyone can fork Code-OSS in ten minutes.

The moat is the arrangement: a fully capable professional development environment in which **the number of deviations from upstream is small, deliberate, and documented — and the resulting experience is fundamentally different.** The Patch Ledger (§2) is the physical proof of that claim and is therefore a moat asset, not a maintenance chore.

A fork that rewrites the editor core has no moat. It has a maintenance burden and a shipping date that never arrives.

### 0.3 Brand register

YVYC-IDE ships in the **Operator register** — precision, restraint, low arousal, high legibility. It does **not** ship in the parent YVYC cosmic register.

This is a doctrinal ruling, not a preference. The cosmic register is high-stimulation by design: saturation, motion, depth, wonder. That register is correct for recalibrating adults back into imagination. It is directly contraindicated for a surface used for hours by operators with photophobia, sensory overload, and attention fatigue. Shipping cosmic visuals in this product would kill the accessibility thesis in the first ten minutes of use.

Cosmic appears in YVYC-IDE only in marketing surfaces and the splash/about panel. Never in the working chrome.

### 0.4 Sibling adjacency

YVYC-IDE and **AhNuu** (registry #14) form the YVYC developer-tooling family. AhNuu's GO / NO-GO release gate is the designated first-party extension in YVYC-IDE (§7.4, EXT-004). One product reduces decision load at the release boundary; the other reduces it at the authoring surface. Same thesis, expressed twice.

### 0.5 Out of scope for v1.0

- Web/server distribution (`code-server` shape)
- Remote development
- Marketplace of first-party YVYC extensions
- Windows and Linux builds (see §8.2 — macOS arm64 only for v0)

---

## 1 — THE LAYER LAW

### 1.1 Statement

> **Every capability lands at the highest layer that can carry it. A lower layer is used only when the layer above it has been attempted and documented as insufficient.**

### 1.2 Why this is the whole game

Upstream VS Code ships on a roughly monthly cadence. Every line changed inside `src/vs/` is a merge tax paid on every release, forever, compounding.

Forks do not die from bad ideas. They die at month eight, when accumulated core divergence turns each merge into a multi-day archaeology dig, the operator stops merging, upstream security patches stop landing, and the product becomes a museum piece with known CVEs.

The Layer Law is the survival instrument.

### 1.3 The ladder

| Layer | Name | Merge cost | Contents |
|---|---|---|---|
| **L1** | Configuration & theme | Zero | Default settings, color theme, product icon theme, typography, keybindings defaults |
| **L2** | First-party extension | Zero | Bundled YVYC extensions shipped in the build; all novel accessibility behavior |
| **L3** | Built-in override | Low | Replacing or disabling a shipped default extension or built-in resource |
| **L4** | Core patch | High — ledgered | Modifications inside `src/vs/`, `build/`, or Electron main |

A surprising volume of TBI/PTSD-relevant work lives entirely at L1. Most teams never look there because L1 feels unimpressive. It is not unimpressive. It is free.

### 1.4 Promotion procedure

Before any capability may descend a layer:

1. State the capability in one sentence, in user terms.
2. Attempt it at the current layer. Record the attempt.
3. Name the specific API, setting, or extension-point gap that blocks it.
4. Confirm the gap against current upstream source, not memory.
5. If descending to L4, open a Patch Ledger entry **before** writing code.

An unattempted higher layer is not a justification. "It would be cleaner in core" is not a justification. Only a named, verified gap is a justification.

### 1.5 Core patch quota

**Hard ceiling for v1.0: eight active L4 patches.**

Exceeding the ceiling requires a documented doctrine amendment, not a commit. The ceiling exists to force L1/L2 creativity, which is where the product's actual value lives.

---

## 2 — THE PATCH LEDGER

### 2.1 Purpose

A numbered register of every deviation from upstream. Single source of truth for what YVYC-IDE is, mechanically. Governs merges, audits, security response, and any future contributor's onboarding.

Lives at `DOCTRINE/PATCH-LEDGER.md`. Repo-droppable markdown. Versioned with the fork.

### 2.2 Entry schema

```
### PATCH-0001 — <short title>
- Layer:              L3 | L4
- Status:             active | retired | absorbed-upstream
- Introduced:         YVYC-IDE v0.1.0
- Upstream anchor:    <upstream release tag at time of authoring>
- Files touched:      <exact paths>
- Patch file:         yvyc/patches/0001-<slug>.patch
- Capability:         <one sentence, user terms>
- Higher-layer attempt: <what was tried at L1/L2 and the exact gap that blocked it>
- Blast radius:       <what else in the editor this can break>
- Upstream fragility: <what upstream change invalidates this patch>
- Re-verification:    <exact steps to confirm it still works after a merge>
- Last verified:      <upstream tag> · <date>
```

### 2.3 Rules

1. **No patch without an entry.** A core modification with no ledger entry is a defect, regardless of whether it works.
2. **Patches live as files.** Every L4 change is stored as a `.patch` file in `yvyc/patches/`, applied by script during build. Never as free-floating commits in the merged tree. This makes reapplication mechanical and makes conflict surface immediately and legibly.
3. **`Re-verification` is executable.** Prose like "check that it still works" fails review. Steps must be specific enough that a person who has never seen the patch can run them.
4. **Retired patches are not deleted.** Status changes to `retired` or `absorbed-upstream`, with a date and reason. The ledger is a historical record, not a to-do list.
5. **Every merge closes with a ledger reconciliation pass** (§6.4). No exceptions, no partial passes, no "verify next time."

### 2.4 No fake green

A patch is verified when its re-verification steps have been run and observed. Not when the build compiles. Not when the app launches. Not when it "should" work because nothing upstream looked related. Verification-first, no fake completion states.

---

## 3 — IDENTITY AND BRANDING PASS

### 3.1 The legal boundary

Code-OSS is MIT-licensed. The MIT grant covers the **code**.

It does **not** cover the "Visual Studio Code" name, the Microsoft and VS Code logos, the product icons, or the official installer branding. Those are Microsoft trademarks. Shipping a build carrying them is a trademark issue independent of the code license.

This is a legal line and it is non-negotiable. Every Microsoft mark, wordmark, icon, and installer asset is removed and replaced before any build leaves the machine — including internal builds, including builds sent to Rachel, including anything screenshotted publicly.

The upstream `LICENSE.txt` and copyright notices are **retained**. Attribution is a condition of the MIT grant. A `NOTICE.md` at repo root states the derivation plainly:

> YVYC-IDE is derived from Code-OSS, the open-source foundation of Microsoft Visual Studio Code, under the MIT License. YVYC-IDE is not produced by, endorsed by, or affiliated with Microsoft Corporation.

### 3.2 `product.json` — the identity file

This is where the fork becomes YVYC-IDE. Fields requiring override:

| Field | Purpose |
|---|---|
| `nameShort` | Displayed product name |
| `nameLong` | Full product name in titles and about |
| `applicationName` | CLI binary name |
| `dataFolderName` | User data directory (`~/.yvyc-ide`) — **must change, or the fork collides with an installed VS Code** |
| `serverDataFolderName` | Server-side data dir |
| `urlProtocol` | Custom URL scheme |
| `win32*` / `darwinBundleIdentifier` / `linux*` | Platform bundle identity, app IDs, mutex names |
| `licenseUrl`, `reportIssueUrl`, `documentationUrl`, `releaseNotesUrl`, `requestFeatureUrl` | All point to YVYC surfaces or are removed |
| `extensionsGallery` | Extension registry endpoints (§4) |
| `linkProtectionTrustedDomains` | YVYC domains |
| `quality` | Release channel identifier |
| `enableTelemetry` | `false` |
| `aiConfig` / telemetry keys | Removed entirely, not set to empty strings |

**Method:** maintain `yvyc/product.overrides.json` and merge it into upstream `product.json` at build time. Never hand-edit the upstream file. Hand-editing produces a merge conflict on every single upstream release; a build-time merge produces zero.

### 3.3 Asset replacement

- Application icons — all platform sizes, all densities
- Installer and DMG background art
- File-type association icons
- Welcome/walkthrough imagery
- Splash and About panel

Sources: YVYC parent eclipse-with-wordmark and silver Y crest, rendered to the Operator register per §0.3 — monochrome/silver on neutral, no cosmic saturation in chrome.

### 3.4 Telemetry

Telemetry is stripped, not disabled. Disabled telemetry is a setting a future upstream merge can silently flip. Stripped telemetry is an architectural property.

Endpoint constants removed, reporter registration neutered, remote experimentation/flighting disabled. A build-time scan (§9, GATE-04) asserts zero Microsoft telemetry hosts appear in build output. The scan is the guarantee; the code change is only the implementation.

VSCodium's de-branding and telemetry-removal scripts are the public reference for exactly this pass. **Read them as reference. Do not import them.** Their patches target their fork's assumptions and will produce silent divergence from this ledger.

---

## 4 — MARKETPLACE DECISION RECORD

### 4.1 Ruling

**YVYC-IDE points `extensionsGallery` at Open VSX (Eclipse Foundation).**

### 4.2 Rationale

The Microsoft Visual Studio Marketplace terms of use restrict access to official Microsoft Visual Studio products. Non-Microsoft builds are not licensed to query or install from it. Every serious Code-OSS fork in production — VSCodium, Gitpod, and the commercial AI editors — routes to Open VSX for this reason.

This is settled. It is not a tradeoff to reconsider under user pressure.

### 4.3 Consequence — plan for it now

Open VSX carries a large but **not identical** catalog. Extensions a user expects may be absent, stale, or published by a mirror rather than the original author.

Required before any external distribution:

1. Build a **required-extension inventory** — what an operator must have to work in this environment.
2. Verify each against Open VSX availability and freshness.
3. For gaps: bundle a permissively-licensed equivalent as a built-in, or document the gap in-product.
4. Never instruct users to sideload from the Microsoft marketplace as a workaround. That routes the user into the same terms problem and makes it their exposure.

### 4.4 Manual install path

`.vsix` sideload via the command palette remains available and unrestricted. Document it in the YVYC-IDE welcome flow as the supported path for extensions absent from the configured registry.

---

## 5 — EXTENSION EXCLUSION REGISTER

### 5.1 Cannot ship, ever

These are proprietary Microsoft extensions, licensed only for use with official Visual Studio Code. They are not part of Code-OSS and cannot be bundled, mirrored, or scripted into YVYC-IDE:

- C/C++ (`ms-vscode.cpptools`)
- C# / .NET tooling (`ms-dotnettools.*`)
- GitHub Copilot and Copilot Chat
- Remote Development pack (SSH, Containers, WSL)
- Live Share
- Python's proprietary language-server component (Pylance)
- Microsoft's proprietary debugger adapters where separately licensed

### 5.2 Required action

Maintain `DOCTRINE/EXTENSION-EXCLUSION-REGISTER.md` pairing each exclusion with the shipping open alternative and its current capability delta. The language-support story is decided **before** external distribution, not after the first user asks why their debugger is missing.

### 5.3 Marketing constraint

YVYC-IDE never advertises, implies, or screenshots a capability that depends on an excluded extension.

---

## 6 — UPSTREAM MERGE CADENCE

### 6.1 Branch model

| Branch | Role |
|---|---|
| `upstream-vendor` | Pristine mirror of upstream. Never modified. |
| `main` | YVYC-IDE trunk. Contains `yvyc/`, `DOCTRINE/`, build overrides. |
| `merge/<upstream-tag>` | Integration branch per upstream release. Deleted after merge. |
| `release/yvyc-<version>` | Cut for each shipped build. |

Remote `upstream` points at the Microsoft repository, fetch-only.

### 6.2 Cadence

**Merge within 14 days of each upstream stable release.**

**Never skip two consecutive upstream releases.** Two skipped releases triggers a mandatory full ledger audit before any further merge — every active patch re-derived against current upstream, not force-applied. This is the tripwire that prevents silent fork rot.

### 6.3 Merge ritual

1. Fetch upstream. Fast-forward `upstream-vendor` to the new stable tag.
2. Cut `merge/<tag>` from `main`.
3. Merge `upstream-vendor` into the integration branch.
4. Resolve conflicts **by ledger** — for each conflict, locate the governing PATCH entry and resolve according to its stated capability. Conflicts in files with no ledger entry are defects: either an undocumented patch exists, or the resolution is "take upstream."
5. Reapply `yvyc/patches/` cleanly. Any patch that fails to apply is re-derived, and its ledger entry updated with a new upstream anchor.
6. Run all verification gates (§9).
7. Run the ledger reconciliation pass (§6.4).
8. Merge to `main`. Tag. Build. Log to `DOCTRINE/MERGE-LOG.md`.

### 6.4 Ledger reconciliation pass

For every `active` entry: run its `Re-verification` steps, observe the result, update `Last verified`.

An entry that cannot be verified is marked `active — unverified` and blocks the release. Not a warning. A block.

---

## 7 — ACCESSIBILITY ARCHITECTURE

### 7.1 The Six Laws

**Law 1 — Highest Layer Wins.** Capability lands at the highest layer that can carry it. (§1)

**Law 2 — No Directives About the Operator.** The environment never tells the user what to do about their own state. No "take a break," no "you've been coding for three hours," no wellness nudges, no streak guilt, no state diagnosis. The environment may **surface** neutral information the operator explicitly asked to see. It never **instructs**. A tool that manages the user's state has replaced a partner with a babysitter, and the audience this product is built for has had enough of that from every other system in their life.

**Law 3 — Nothing Appears Without Warning.** No unrequested modal, no surprise focus steal, no popup over the editing surface, no sudden audio. Startle response is a clinical feature of the target population, not a UX preference. State changes land in a persistent, predictable, low-arousal region.

**Law 4 — Every Interruption Is Recoverable.** Returning to work after a break is the single hardest moment for an operator with working-memory impairment. Re-entry is a first-class product primitive, not a session-restore checkbox.

**Law 5 — Default Is Calm.** Accessibility is the shipped default configuration. There is no "accessibility mode" to discover and enable. The operator who never opens settings gets the full benefit.

**Law 6 — Every Deviation Is Ledgered.** (§2)

### 7.2 Layer 1 — Configuration and theme

Zero merge cost. Shipped as default settings, a first-party color theme, and a product icon theme.

**Sensory regulation**
- Luminance ceiling on light theme; no pure-white editor background. Photophobia is common post-TBI.
- Saturation ceiling on all chrome accents. No maximum-chroma error red — amber-first error palette; red reserved for destructive confirmation only.
- Contrast meets WCAG AA at minimum across every token, verified by gate, not by eye.

**Motion**
- Reduced motion on by default. Cursor blink off. Smooth scrolling off. Minimap off. No animated indicators in the status bar.

**Audio**
- All audio cues off by default. No error sound. Audio is opt-in per cue, never a bundle.

**Typography and reading load**
- Line height floor at 1.6. Font size floor raised above upstream default. Letter-spacing adjustment available in one setting.
- Word wrap on by default — eliminates horizontal scanning, which is disproportionately costly under attention fatigue.
- A dyslexia-oriented font ships bundled and is switchable in one setting.

**Orientation and working memory**
- Sticky scroll on. Breadcrumbs on. Both hold structural context that impaired working memory otherwise has to reconstruct.
- Bracket pair colorization and indent guides on.

**Density**
- Activity bar reduced to the essential set. Badge and decoration noise suppressed by default. Notification toasts routed to a persistent region rather than surfacing over the editor (Law 3).

### 7.3 Layer 2 — First-party extensions

Zero merge cost. This is where the product's differentiation lives.

**EXT-001 — Re-entry.** The flagship. On session resume, presents a single readable card: last file and position, last change made, the stated intent at last session close, and any open question the operator captured. Not a list of reopened tabs — a narrative reconstruction of where the operator was and what they were in the middle of. Directly targets the highest-cost moment in the target population's workflow (Law 4).

**EXT-002 — Task Anchor.** A persistent, always-visible one-line statement of current intent, set by the operator. Survives navigation, panel switching, and session boundaries. The anchor a drifting attention returns to without having to reconstruct it.

**EXT-003 — Focus Containment.** Scope-limited working mode. Everything outside the declared scope is dimmed and de-emphasized — not hidden, which creates orientation loss. One decision surface at a time.

**EXT-004 — AhNuu Gate.** Integration of the AhNuu release-gate engine (registry #14). Local-first, zero-cloud, ending in a single GO / NO-GO with copy-ready fix prompts. Collapses the highest-decision-load moment in the development cycle into one binary answer. The developer-tooling family cohering in-product.

**EXT-005 — Plain Error.** Renders stack traces and toolchain errors as one sentence stating what broke, plus one sentence stating the next action. Full trace remains one click away, never in the default view.

**EXT-006 — Session Ledger.** Neutral, operator-queried record of the session: files touched, decisions recorded, questions parked. Surfaced only when asked. Never volunteered, never summarized with judgment, never used to prompt behavior (Law 2).

### 7.4 Layer 3 — Built-in overrides

- Default color theme replaced with the YVYC Operator theme.
- Welcome and walkthrough content replaced. Upstream's welcome is a feature tour; YVYC-IDE's is an orientation surface.
- Default keybindings pass — no chord requiring simultaneous multi-modifier presses for a primary action.

### 7.5 Layer 4 — Core patch candidates

Candidates only. Each requires a documented L1/L2/L3 attempt and a Patch Ledger entry before implementation. Ceiling of eight (§1.5).

- Global suppression of unrequested focus stealing, if unreachable through the notification and window APIs (Law 3).
- Chrome suppression beyond what Zen Mode exposes, if Focus Containment cannot achieve it from an extension.
- Startle-safe presentation of dialogs that upstream hard-codes as modal.

Everything else is presumed reachable above the line until proven otherwise.

---

## 8 — BUILD AND DISTRIBUTION

### 8.1 Repository shape

```
yvyc-ide/
├── DOCTRINE/
│   ├── YVYC-IDE-FORK-DOCTRINE-v1_0.md
│   ├── PATCH-LEDGER.md
│   ├── EXTENSION-EXCLUSION-REGISTER.md
│   └── MERGE-LOG.md
├── NOTICE.md
├── yvyc/
│   ├── product.overrides.json
│   ├── branding/
│   ├── patches/
│   ├── extensions/
│   └── build/
└── <upstream Code-OSS tree>
```

Upstream tree is treated as read-only territory. Everything YVYC lives in `yvyc/` and `DOCTRINE/` except ledgered L4 patches.

### 8.2 Target platforms

**v0: macOS arm64 only.** Operator machine. One target, verified end to end, before any breadth.

Windows and Linux follow after v0 is stable and the verification gates run clean across three consecutive upstream merges. Windows matters for the wider mission — recipients, Rachel's workflow, the zero-install lineage — and is the first expansion, not an afterthought.

### 8.3 Signing and distribution

macOS builds are signed and notarized before any distribution beyond the operator machine, including to Rachel. An unsigned build teaches the recipient to bypass Gatekeeper, which is a security posture defect introduced by the product.

---

## 9 — VERIFICATION GATES

Every gate runs on every release candidate. All must pass. No partial passes, no waivers, no "known issue" carve-outs at this stage of the product.

| Gate | Assertion |
|---|---|
| **GATE-01** Build | Clean build on target platform from a clean checkout |
| **GATE-02** Ledger | Every `active` patch present, applied, and re-verified per its stated steps |
| **GATE-03** Branding | Zero Microsoft trademark strings, marks, or icon assets in build output |
| **GATE-04** Telemetry | Zero Microsoft telemetry endpoints reachable or referenced in build output |
| **GATE-05** Gallery | `extensionsGallery` resolves to the configured registry; app installs a test extension successfully |
| **GATE-06** Isolation | `dataFolderName` and bundle identifier confirmed distinct; no collision with an installed VS Code |
| **GATE-07** Contrast | Every theme token meets WCAG AA, machine-verified |
| **GATE-08** Motion | Reduced-motion defaults confirmed active on first launch of a fresh profile |
| **GATE-09** Startle | No unrequested modal, focus steal, or audio during a scripted first-run and edit session |
| **GATE-10** Assistive tech | Screen reader smoke pass on core flows: open, edit, save, search, terminal |

**GATE-03 and GATE-04 are release blockers with no override.** They are legal and architectural, not quality.

---

## 10 — CHANGE CONTROL

This document is sealed at v1.0. Sealed means *current issued version of a developing document* — not frozen permanence. It changes by re-seal at v1.1, never by silent edit.

Amendment triggers:

- L4 patch ceiling change
- Marketplace ruling change
- Platform target expansion
- Any new Accessibility Law
- Distribution model change (public release, licensing, pricing)

Companion living documents, each with its own change velocity and **not** governed by this seal:

- `PATCH-LEDGER.md` — changes every merge
- `MERGE-LOG.md` — changes every merge
- `EXTENSION-EXCLUSION-REGISTER.md` — changes with upstream ecosystem

---

## 11 — IMMEDIATE EXECUTION ORDER

1. Initialize repo shape (§8.1). Add `NOTICE.md`. Create empty `PATCH-LEDGER.md`, `MERGE-LOG.md`, `EXTENSION-EXCLUSION-REGISTER.md` with headers.
2. Configure remotes. Establish `upstream-vendor` at the current upstream stable tag. Record the tag — it is the fork's origin anchor and every ledger entry references it.
3. Build unmodified upstream on macOS arm64. Confirm a clean baseline before changing anything. A fork that cannot build upstream cannot diagnose whether a later failure is upstream's or yours.
4. Run the identity pass (§3): `product.overrides.json`, build-time merge script, asset replacement, telemetry strip.
5. Stand up GATE-01, GATE-03, GATE-04, GATE-06 as scripts. Gates before features.
6. Point `extensionsGallery` at Open VSX. Verify GATE-05.
7. Ship the L1 default settings and Operator theme. Verify GATE-07 and GATE-08.
8. Build EXT-001 Re-entry.

Steps 1 through 7 produce a legally clean, calm, working IDE with **zero core patches**. Step 8 is where the product starts.

---

**YourVisionYourCreation LLC · Oklahoma City · 2026**

*The moat is never the code. It's the arrangement — the human pattern made possible, and the name given to it.*

**#YVYCalways**
