/**
 * Centralized environment config for the BlockHouse Web monorepo.
 *
 * Usage in webpack configs:
 *   const { env } = require('../../../webpack.env');
 *
 * Resolution order (later wins):
 *   1. .env                  (committed defaults)
 *   2. .env.local            (git-ignored, per-developer overrides)
 *   3. .env.{NODE_ENV}       (mode-specific, e.g. .env.production)
 *   4. .env.{NODE_ENV}.local (git-ignored, per-developer mode overrides)
 *   5. OS environment variables (CI/CD, Docker — always wins)
 */

const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname);

// Snapshot keys that existed in OS env BEFORE we load any .env files
const osEnvKeys = new Set(Object.keys(process.env));

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    // OS env vars always win — never overwrite those
    if (!osEnvKeys.has(key)) {
      process.env[key] = val;
    }
  }
}

const mode = process.env.NODE_ENV || 'development';

// Load in order — later files override earlier
loadEnvFile(path.join(ROOT, '.env'));
loadEnvFile(path.join(ROOT, '.env.local'));
loadEnvFile(path.join(ROOT, `.env.${mode}`));
loadEnvFile(path.join(ROOT, `.env.${mode}.local`));

/** Resolved env with typed defaults */
const env = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000',

  MF_DASHBOARD_URL: process.env.MF_DASHBOARD_URL || 'http://localhost:3001',
  MF_EMPLOYEES_URL: process.env.MF_EMPLOYEES_URL || 'http://localhost:3002',
  MF_REVENUE_URL: process.env.MF_REVENUE_URL || 'http://localhost:3003',
  MF_SERVICES_URL: process.env.MF_SERVICES_URL || 'http://localhost:3004',
};

module.exports = { env };
