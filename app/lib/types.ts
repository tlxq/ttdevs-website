// ─── Shared domain types ──────────────────────────────────────────────────────

export type RecipientKey = "tom" | "therese";

export interface SelectedPerson {
  recipientKey: RecipientKey;
  name: string;
}

export interface TeamMember {
  recipientKey: RecipientKey;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  /** CSS class name for the avatar gradient, e.g. "tt-gradient-tom" */
  color: string;
}
