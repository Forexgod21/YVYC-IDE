// YVYC-IDE packaging exclusions — PATCH-0001..0004 (DOCTRINE/PATCH-LEDGER.md)
// Prunes ruled-out bundled extensions from a PACKAGED build output directory.
// The source tree is never touched; no upstream file is modified.
//
//   node yvyc/build/apply-exclusions.cjs <packaged-app-root>
//
// <packaged-app-root> is the packaged application directory — either the
// folder containing resources/app, or resources/app itself.

'use strict';

const fs = require('fs');
const path = require('path');

const { excludedBuiltInExtensions } = require('./exclusions.json');

function resolveAppDir(root) {
	for (const candidate of [path.join(root, 'resources', 'app'), root]) {
		if (fs.existsSync(path.join(candidate, 'extensions'))) {
			return candidate;
		}
	}
	throw new Error(`No extensions/ directory found under ${root} — is this a packaged build?`);
}

const root = process.argv[2];
if (!root) {
	console.error('Usage: node yvyc/build/apply-exclusions.cjs <packaged-app-root>');
	process.exit(1);
}

const appDir = resolveAppDir(path.resolve(root));
let removed = 0;

for (const name of excludedBuiltInExtensions) {
	const dir = path.join(appDir, 'extensions', name);
	if (fs.existsSync(dir)) {
		fs.rmSync(dir, { recursive: true, force: true });
		console.log(`removed  extensions/${name}`);
		removed++;
	} else {
		console.log(`absent   extensions/${name} (already not present)`);
	}
}

console.log(`\nExclusions applied: ${removed} pruned. Run verify-build.cjs to assert the result.`);
