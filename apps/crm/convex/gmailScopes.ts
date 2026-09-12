export const gmailSendScope = "https://www.googleapis.com/auth/gmail.send";
export const gmailReadScope = "https://www.googleapis.com/auth/gmail.readonly";
export const gmailSettingsScope =
  "https://www.googleapis.com/auth/gmail.settings.basic";

export function canReadGmailSignature(grantedScopes: readonly string[]): boolean {
  return grantedScopes.includes(gmailSettingsScope);
}
