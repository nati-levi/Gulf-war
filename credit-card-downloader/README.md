# Credit Card Statement Downloader

A small local CLI that uses [israeli-bank-scrapers](https://github.com/eshaham/israeli-bank-scrapers)
to log into your bank/credit-card website with a real (headless) browser and
export your transactions as JSON and CSV.

Everything runs on your own machine. Your credentials only ever go into your
local `.env` file and straight to the bank's own website — nothing is sent
anywhere else.

## Setup

1. Install Node.js **22.22.2 or newer**.
2. Install dependencies:
   ```bash
   cd credit-card-downloader
   npm install
   ```
3. Copy the example env file and fill it in:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env`:
   - `COMPANY_ID` — which institution to scrape (see table below).
   - `START_DATE` — earliest date to fetch transactions from (`YYYY-MM-DD`).
   - `SHOW_BROWSER` — set to `true` the first time you run it, so you can see
     what's happening if login fails (e.g. CAPTCHA, changed UI).
   - The `CREDS_*` fields required for your chosen company (leave the rest
     blank).

## Run

```bash
npm start
```

If your bank/card issuer requires a one-time SMS/email code, the app will
pause and ask you to type it into the terminal.

Results are written to `output/<company>-<account>-<timestamp>.{json,csv}`.
That folder is git-ignored — statements never get committed.

## Supported companies and required credentials

| `COMPANY_ID` value | Required `.env` fields |
|---|---|
| `hapoalim` | `CREDS_USER_CODE`, `CREDS_PASSWORD` |
| `leumi` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `discount` | `CREDS_ID`, `CREDS_PASSWORD`, `CREDS_NUM` |
| `mercantile` | `CREDS_ID`, `CREDS_PASSWORD`, `CREDS_NUM` |
| `mizrahi` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `otsarHahayal` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `visaCal` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `max` (formerly Leumi Card) | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `isracard` | `CREDS_ID`, `CREDS_PASSWORD`, `CREDS_CARD6_DIGITS` |
| `amex` | `CREDS_ID`, `CREDS_PASSWORD`, `CREDS_CARD6_DIGITS` |
| `union` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `beinleumi` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `massad` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `yahav` | `CREDS_USERNAME`, `CREDS_PASSWORD`, `CREDS_NATIONAL_ID` |
| `beyahadBishvilha` | `CREDS_ID`, `CREDS_PASSWORD` |
| `pagi` | `CREDS_USERNAME`, `CREDS_PASSWORD` |
| `behatsdaa` | `CREDS_ID`, `CREDS_PASSWORD` |

`oneZero` is supported by the underlying library but not by this CLI — its
login needs a phone-OTP handshake or a pre-generated long-term token that
doesn't fit this env-var-driven flow.

Most credit-card companies in Israel (Isracard, Max/CAL, Amex) issue a single
statement account per card, so you'll typically only need one `COMPANY_ID` —
run the tool again with a different `.env` (or `COMPANY_ID` value) per card
issuer if you hold cards from more than one.

If a bank changes its website, `israeli-bank-scrapers` may need to publish an
update before scraping works again — check
[its README/issues](https://github.com/eshaham/israeli-bank-scrapers) if
login suddenly stops working.

## Troubleshooting

- **Login fails / times out**: set `SHOW_BROWSER=true` and re-run to watch
  what the browser does.
- **"Missing required credential(s)"**: check the table above and fill in
  the matching `CREDS_*` fields in `.env`.
- **Puppeteer/Chromium errors on Linux**: you may need extra system libs;
  see Puppeteer's
  [troubleshooting docs](https://pptr.dev/troubleshooting).
- **`npm install` fails with "the executable ... is missing"**: Puppeteer's
  postinstall step downloads a bundled Chromium build and the download got
  interrupted (VPN/proxy/firewall), leaving a broken cache. Fix:
  ```bash
  rm -rf ~/.cache/puppeteer
  rm -rf node_modules
  npm install
  ```
  If it still fails, confirm you can reach `https://storage.googleapis.com`
  and `https://googlechromelabs.github.io` from your network (try a
  different network/VPN off to confirm it's a connectivity block).
