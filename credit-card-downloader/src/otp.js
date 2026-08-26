import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

// Used as the scraper's `otpCodeRetriever` option for companies that require
// an interactive one-time-password step during login. Prompts in the
// terminal and returns whatever the user types.
export async function promptForOtp() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const code = await rl.question(
      'Enter the one-time password (OTP) you just received: '
    );
    return code.trim();
  } finally {
    rl.close();
  }
}
