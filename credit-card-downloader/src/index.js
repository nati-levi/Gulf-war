import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CompanyTypes, createScraper } from 'israeli-bank-scrapers';
import { buildCredentials } from './credentials.js';
import { transactionsToCsv } from './csv.js';
import { promptForOtp } from './otp.js';

function parseBool(value, fallback) {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes'].includes(value.toLowerCase());
}

async function main() {
  const companyKey = process.env.COMPANY_ID;
  if (!companyKey) {
    throw new Error(
      'COMPANY_ID is not set. Copy .env.example to .env and fill it in.'
    );
  }

  const companyId = CompanyTypes[companyKey];
  if (!companyId) {
    const supported = Object.keys(CompanyTypes).join(', ');
    throw new Error(
      `Unknown COMPANY_ID "${companyKey}". Supported values: ${supported}`
    );
  }

  const credentials = buildCredentials(companyKey, process.env);

  const startDateStr = process.env.START_DATE;
  const startDate = startDateStr
    ? new Date(startDateStr)
    : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  if (Number.isNaN(startDate.getTime())) {
    throw new Error(`Invalid START_DATE "${startDateStr}". Use YYYY-MM-DD.`);
  }

  const showBrowser = parseBool(process.env.SHOW_BROWSER, false);

  console.log(
    `Scraping ${companyKey} for transactions since ${startDate
      .toISOString()
      .slice(0, 10)}...`
  );

  const scraper = createScraper({
    companyId,
    startDate,
    combineInstallments: false,
    showBrowser,
    otpCodeRetriever: promptForOtp,
  });

  const result = await scraper.scrape(credentials);

  if (!result.success) {
    throw new Error(
      `Scrape failed: ${result.errorType}${
        result.errorMessage ? ` - ${result.errorMessage}` : ''
      }`
    );
  }

  const outDir = path.join(process.cwd(), 'output');
  await fs.mkdir(outDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  for (const account of result.accounts) {
    const base = `${companyKey}-${account.accountNumber}-${timestamp}`;
    const jsonPath = path.join(outDir, `${base}.json`);
    const csvPath = path.join(outDir, `${base}.csv`);

    await fs.writeFile(jsonPath, JSON.stringify(account, null, 2), 'utf8');
    await fs.writeFile(csvPath, transactionsToCsv(account.txns), 'utf8');

    console.log(
      `Account ${account.accountNumber}: ${account.txns.length} transactions -> ${csvPath}`
    );
  }

  console.log('Done. Statements saved in the output/ folder.');
}

main().catch((err) => {
  console.error(err && err.message ? err.message : err);
  process.exitCode = 1;
});
