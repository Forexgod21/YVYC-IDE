# YVYC-IDE — PROPOSED AMENDMENTS FOR v1.1 RE-SEAL

Status: **PROPOSED — awaiting owner approval.** Per Doctrine §10, the sealed v1.0 text is unchanged; these amendments take effect only on re-seal as v1.1.

---

## A1 — GATE-03 rewording (contradiction fix)

v1.0 GATE-03 ("zero Microsoft trademark strings in build output") contradicts §3.1, which correctly requires retaining Microsoft copyright notices per the MIT grant. As written the gate can never pass — for any fork, including Google Antigravity, whose packages also carry the required legal text.

**Amended GATE-03:** Zero Microsoft marks, logos, product names, or icon assets in any **user-facing surface** — app name, icons, installer/DMG, menus, About panel, bundle metadata, file associations — with an explicit allowlist for legally required attribution text (`LICENSE.txt`, `ThirdPartyNotices.txt`, copyright headers).

## A2 — Update mechanism (new §3.5 + new gate)

Upstream builds check a Microsoft update endpoint on launch. The updater is stripped or pointed at YVYC infrastructure; a fresh-profile first launch performs no update check against any Microsoft host. New **GATE-11 (Updater)** asserts this, same blocker status as GATE-04.

## A3 — In-core AI/chat ruling (new section)

Upstream now ships chat, agent sessions, and voice in core (`defaultChatAgent`, `agentsTelemetryAppName`, `voiceWsUrl` in product.json). Ruling: these fields are **omitted** from the merged product.json so in-core chat surfaces stay dormant; residual visible chat UI is suppressed at L1/L3; L4 only on documented failure of the above. Touches Laws 3 and 5.

## A4 — §3.2 correction

Code-OSS `product.json` does not contain `extensionsGallery`, `quality`, `enableTelemetry`, or `aiConfig` — the overrides file **adds** these. `enableTelemetry` is dropped from the table (not honored by modern builds; telemetry is governed by absence of keys/connection strings). Added to the audit list: `builtInExtensions` (some built-ins are downloaded at build time — audit what is pulled), `electronArtifactFeed` / `nodejsArtifactFeed`.

## A5 — L1 mechanism note (§7.2)

Shipped default settings are implemented via a `configurationDefaults` contribution in a bundled first-party "YVYC Defaults" extension (mechanically L2, still zero merge cost). Core defaults in `src/vs` are not hand-patched for this purpose.

## A6 — Telemetry strip vs patch ceiling (§3.4)

Key/endpoint removal happens at build time in the product.json merge (zero merge cost). L4 telemetry patches are used only for what GATE-04's scan proves still phones home, and **count against the eight-patch ceiling**.

## A7 — Extension signature verification (§4)

Open VSX does not use Microsoft's signing chain; signature verification is disabled or re-pointed accordingly, and GATE-05 notes this explicitly.

## A8 — Recommendation-surface audit (§4.3 addition)

Forks inherit upstream's recommended-extension machinery; recommendations for extensions absent from Open VSX are a name-squatting attack surface (publicly reported Jan 2026 against Antigravity, Cursor, Windsurf, Trae). Inherited recommendation surfaces are audited and stripped. **GATE-05 failure condition added:** a recommendation rendered for an extension absent from the configured registry.

## A9 — Smaller items

- **GATE-07** scoped to text-bearing token pairs (contrast ratio is undefined for non-text tokens).
- **Dyslexia font** named with license (OpenDyslexic or Atkinson Hyperlegible, both SIL OFL) and added to `NOTICE.md` on bundling.
- **§8.3 / §11:** paid Apple Developer ID acquired before any distribution beyond the operator machine.
- **§11 step 2:** re-anchor from the current untagged snapshot (`7b1383df`, 1.134.0) to the nearest stable release tag; record it in `MERGE-LOG.md`.

---

**YourVisionYourCreation LLC**
