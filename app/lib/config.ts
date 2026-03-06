/**
 * Centralized environment variable keys for the contact API.
 * All access to process.env should go through `getEnv()` — server-side only.
 */

export const ENV = {
  RESEND_API_KEY:            "RESEND_API_KEY",
  RESEND_FROM_EMAIL:         "RESEND_FROM_EMAIL",
  CONTACT_TO_TOM_EMAIL:      "CONTACT_TO_TOM_EMAIL",
  CONTACT_TO_THERESE_EMAIL:  "CONTACT_TO_THERESE_EMAIL",
} as const;

export type EnvKey = keyof typeof ENV;

/** Read an env var by its key. Server-side only. */
export function getEnv(key: EnvKey): string | undefined {
  return process.env[ENV[key]];
}
