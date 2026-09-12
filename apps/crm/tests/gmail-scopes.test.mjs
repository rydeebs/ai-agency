import assert from "node:assert/strict";
import test from "node:test";
import {
  canReadGmailSignature,
  gmailSettingsScope,
} from "../convex/gmailScopes.ts";

test("legacy Gmail connections can send without signature access", () => {
  assert.equal(
    canReadGmailSignature(["https://www.googleapis.com/auth/gmail.send"]),
    false,
  );
});

test("Gmail connections with settings access can load the signature", () => {
  assert.equal(canReadGmailSignature([gmailSettingsScope]), true);
});
