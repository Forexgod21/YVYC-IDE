# YVYC-IDE build helpers

## Codespace / first build — the whole routine

```bash
npm install                              # ~15-30 min first time
node yvyc/build/apply-identity.cjs        # become YVYC-IDE (Doctrine §3.2)
npm run compile                          # ~15-30 min first time
./scripts/code.sh                        # launch the editor
```

The identity script modifies `product.json` in the working tree only.
**Never commit the modified `product.json`.** Before any commit:

```bash
node yvyc/build/apply-identity.cjs --restore
```

`git status` should show a clean `product.json` before every commit —
the YVYC identity lives permanently in `yvyc/product.overrides.json`,
and is applied fresh at every build. This is what keeps upstream merges
conflict-free (Doctrine §3.2).

## Packaging exclusions and gate (PATCH-0001..0006)

After producing a packaged build, prune the ruled-out Microsoft components
and assert the result. The ruled list lives in `exclusions.json`; the
governing entries are in `DOCTRINE/PATCH-LEDGER.md`.

```bash
node yvyc/build/apply-exclusions.cjs <packaged-app-root>   # prune ruled extensions
node yvyc/build/verify-build.cjs <packaged-app-root>       # gate: fails loudly on any violation
```

`verify-build.cjs` must PASS on every release candidate: excluded
extensions absent, dev tooling absent, stripped product fields absent,
zero Microsoft telemetry hostnames in build output (GATE-04). The source
tree is never modified by either script — `extensions/git` and
`extensions/git-base` always ship.
