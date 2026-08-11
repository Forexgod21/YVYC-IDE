// YVYC-IDE build verification — asserts PATCH-0001..0006 on a packaged build.
// This is the gate, not the implementation: it must FAIL loudly on any violation.
// Covers: excluded extensions absent (PATCH-0001..0004), dev tooling absent
// (PATCH-0006), stripped product fields absent + telemetry hostname scan
// (PATCH-0005 / GATE-04).
//
//   node yvyc/build/verify-build.cjs <packaged-app-root>

'use strict';

const fs = require('fs');
const path = require('path');

const {
	excludedBuiltInExtensions,
	devToolingMustBeAbsent,
	strippedProductFields,
	telemetryHostBlocklist
} = require('./exclusions.json');

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
	console.error('Usage: node yvyc/build/verify-build.cjs <packaged-app-root>');
	process.exit(1);
}

const appDir = resolveAppDir(path.resolve(root));
const failures = [];

// PATCH-0001..0004 — excluded extensions must be absent
for (const name of excludedBuiltInExtensions) {
	if (fs.existsSync(path.join(appDir, 'extensions', name))) {
		failures.push(`PATCH-000x violation: extensions/${name} present in build output`);
	}
}

// PATCH-0006 — dev tooling must be absent
if (fs.existsSync(path.join(appDir, '.vscode'))) {
	failures.push('PATCH-0006 violation: .vscode/ present in build output');
}
for (const name of devToolingMustBeAbsent) {
	if (fs.existsSync(path.join(appDir, 'extensions', name))) {
		failures.push(`PATCH-0006 violation: extensions/${name} present in build output`);
	}
}

// PATCH-0005 — stripped product fields must be absent
const productPath = path.join(appDir, 'product.json');
if (fs.existsSync(productPath)) {
	const product = JSON.parse(fs.readFileSync(productPath, 'utf8'));
	for (const field of strippedProductFields) {
		if (field in product) {
			failures.push(`PATCH-0005 violation: product.json still contains "${field}"`);
		}
	}
} else {
	failures.push('verify: product.json not found in build output');
}

// GATE-04 — telemetry hostname scan over build output text files
const SCAN_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.json', '.html']);
const hits = [];
(function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(full);
		} else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
			const text = fs.readFileSync(full, 'utf8');
			for (const host of telemetryHostBlocklist) {
				if (text.includes(host)) {
					hits.push(`${path.relative(appDir, full)} → ${host}`);
				}
			}
		}
	}
})(appDir);
if (hits.length) {
	failures.push(`GATE-04 violation: telemetry hostnames referenced in build output:\n  ${hits.join('\n  ')}`);
}

if (failures.length) {
	console.error('VERIFY: FAIL\n');
	for (const f of failures) {
		console.error(' ✗ ' + f);
	}
	process.exit(1);
}
console.log('VERIFY: PASS — exclusions absent, product fields stripped, zero telemetry hostnames.');
