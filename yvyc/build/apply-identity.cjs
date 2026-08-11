// YVYC-IDE identity pass — Fork Doctrine §3.2
// Merges yvyc/product.overrides.json into product.json in the working tree.
// The upstream file is never hand-edited (Doctrine §3.2); run --restore to
// return the tree to pristine upstream before committing anything.
//
//   node yvyc/build/apply-identity.cjs            apply YVYC identity
//   node yvyc/build/apply-identity.cjs --restore  restore upstream product.json

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
const productPath = path.join(repoRoot, 'product.json');
const overridesPath = path.join(repoRoot, 'yvyc', 'product.overrides.json');

if (process.argv.includes('--restore')) {
	execSync('git checkout -- product.json', { cwd: repoRoot, stdio: 'inherit' });
	console.log('product.json restored to pristine upstream.');
	process.exit(0);
}

const product = JSON.parse(fs.readFileSync(productPath, 'utf8'));
const overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf8'));

// Fields stripped entirely (telemetry/AI surfaces stay dormant when absent —
// Doctrine §3.4 and Amendment A3): removal, not empty values.
const STRIP = [
	'defaultChatAgent',
	'agentsTelemetryAppName',
	'voiceWsUrl',
	'aiConfig',
	'telemetryConnectionString'
];

for (const key of STRIP) {
	delete product[key];
}

Object.assign(product, overrides);

fs.writeFileSync(productPath, JSON.stringify(product, null, '\t') + '\n');
console.log('YVYC identity applied to product.json:');
console.log(`  name: ${product.nameLong}`);
console.log(`  data folder: ${product.dataFolderName}`);
console.log(`  gallery: ${product.extensionsGallery ? product.extensionsGallery.serviceUrl : '(none)'}`);
console.log(`  stripped: ${STRIP.join(', ')}`);
console.log('\nWorking tree is now modified. Run with --restore before committing.');
