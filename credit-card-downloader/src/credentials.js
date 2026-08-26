// Maps each supported companyId to the credential fields israeli-bank-scrapers
// expects, and the .env variable each one is read from.
// Reference: https://github.com/eshaham/israeli-bank-scrapers#credentials
export const CREDENTIAL_FIELDS = {
  hapoalim: [
    ['userCode', 'CREDS_USER_CODE'],
    ['password', 'CREDS_PASSWORD'],
  ],
  leumi: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  discount: [
    ['id', 'CREDS_ID'],
    ['password', 'CREDS_PASSWORD'],
    ['num', 'CREDS_NUM'],
  ],
  mercantile: [
    ['id', 'CREDS_ID'],
    ['password', 'CREDS_PASSWORD'],
    ['num', 'CREDS_NUM'],
  ],
  mizrahi: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  otsarHahayal: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  visaCal: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  max: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  isracard: [
    ['id', 'CREDS_ID'],
    ['password', 'CREDS_PASSWORD'],
    ['card6Digits', 'CREDS_CARD6_DIGITS'],
  ],
  amex: [
    ['id', 'CREDS_ID'],
    ['password', 'CREDS_PASSWORD'],
    ['card6Digits', 'CREDS_CARD6_DIGITS'],
  ],
  union: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  beinleumi: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  massad: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  yahav: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
    ['nationalID', 'CREDS_NATIONAL_ID'],
  ],
  beyahadBishvilha: [
    ['id', 'CREDS_ID'],
    ['password', 'CREDS_PASSWORD'],
  ],
  pagi: [
    ['username', 'CREDS_USERNAME'],
    ['password', 'CREDS_PASSWORD'],
  ],
  behatsdaa: [
    ['id', 'CREDS_ID'],
    ['password', 'CREDS_PASSWORD'],
  ],
  // oneZero is intentionally unsupported here: its login flow needs either
  // an interactive phone-OTP handshake or a pre-generated long-term token,
  // which doesn't fit this env-var-driven CLI. Use israeli-bank-scrapers
  // directly if you need it.
};

export function buildCredentials(companyId, env) {
  const fields = CREDENTIAL_FIELDS[companyId];
  if (!fields) {
    const supported = Object.keys(CREDENTIAL_FIELDS).join(', ');
    throw new Error(
      `Unknown COMPANY_ID "${companyId}". Supported values: ${supported}`
    );
  }

  const credentials = {};
  const missing = [];
  for (const [credKey, envKey] of fields) {
    const value = env[envKey];
    if (!value) {
      missing.push(envKey);
      continue;
    }
    credentials[credKey] = value;
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required credential(s) for company "${companyId}": ${missing.join(', ')}. ` +
        'Set them in your .env file (see .env.example).'
    );
  }

  return credentials;
}
