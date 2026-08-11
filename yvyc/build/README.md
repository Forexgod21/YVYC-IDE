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
