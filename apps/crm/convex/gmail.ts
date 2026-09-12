import { v } from "convex/values";
import { internal } from "./_generated/api";
import type { ActionCtx } from "./_generated/server";
import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { authedQuery } from "./model/functions";
import {
  canReadGmailSignature,
  gmailReadScope,
  gmailSendScope,
  gmailSettingsScope,
} from "./gmailScopes";
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

const realValue = (value: string | undefined): value is string =>
  !!value && value !== "unset";

const gmailEnvironment = () => {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const siteUrl = process.env.CONVEX_SITE_URL;
  if (!realValue(clientId) || !realValue(clientSecret) || !siteUrl) {
    throw new Error(
      "Gmail is not configured. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET on this Convex deployment.",
    );
  }
  const redirectUri =
    process.env.GMAIL_REDIRECT_URI ?? `${siteUrl}/oauth/gmail/callback`;
  return { clientId, clientSecret, siteUrl, redirectUri };
};

const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const base64ToBytes = (value: string): Uint8Array => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - (normalized.length % 4)) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const asArrayBuffer = (bytes: Uint8Array): ArrayBuffer =>
  bytes.slice().buffer as ArrayBuffer;

const base64Url = (bytes: Uint8Array): string =>
  bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const randomBase64Url = (size: number): string => {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
};

const sha256 = async (value: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return base64Url(new Uint8Array(digest));
};

const encryptionKey = async (): Promise<CryptoKey> => {
  const encoded = process.env.GMAIL_TOKEN_ENCRYPTION_KEY;
  if (!realValue(encoded)) {
    throw new Error(
      "Gmail token encryption is not configured. Set GMAIL_TOKEN_ENCRYPTION_KEY.",
    );
  }
  const bytes = base64ToBytes(encoded);
  if (bytes.byteLength !== 32) {
    throw new Error("GMAIL_TOKEN_ENCRYPTION_KEY must contain 32 base64 bytes");
  }
  return await crypto.subtle.importKey(
    "raw",
    asArrayBuffer(bytes),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
};

const encryptRefreshToken = async (
  refreshToken: string,
): Promise<{ encryptedRefreshToken: string; tokenIv: string }> => {
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    await encryptionKey(),
    new TextEncoder().encode(refreshToken),
  );
  return {
    encryptedRefreshToken: bytesToBase64(new Uint8Array(encrypted)),
    tokenIv: bytesToBase64(iv),
  };
};

const decryptRefreshToken = async (args: {
  encryptedRefreshToken: string;
  tokenIv: string;
}): Promise<string> => {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: asArrayBuffer(base64ToBytes(args.tokenIv)) },
    await encryptionKey(),
    asArrayBuffer(base64ToBytes(args.encryptedRefreshToken)),
  );
  return new TextDecoder().decode(decrypted);
};

const requireIdentity = async (ctx: ActionCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity;
};

export const status = authedQuery({
  args: {},
  returns: v.object({
    connected: v.boolean(),
    email: v.union(v.string(), v.null()),
    grantedScopes: v.array(v.string()),
    connectedAt: v.union(v.number(), v.null()),
  }),
  handler: async (ctx) => {
    const connection = await ctx.db.query("gmailConnections").first();
    return {
      connected: connection !== null,
      email: connection?.email ?? null,
      grantedScopes: connection?.grantedScopes ?? [],
      connectedAt: connection?.connectedAt ?? null,
    };
  },
});

export const beginConnection = action({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await requireIdentity(ctx);
    const { clientId, redirectUri } = gmailEnvironment();
    const state = randomBase64Url(32);
    await ctx.runMutation(internal.gmail.createOAuthState, {
      stateHash: await sha256(state),
      expiresAt: Date.now() + OAUTH_STATE_TTL_MS,
    });

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", `openid email ${gmailSendScope} ${gmailReadScope} ${gmailSettingsScope}`);
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("include_granted_scopes", "true");
    url.searchParams.set("prompt", "consent");
    url.searchParams.set("state", state);
    return url.toString();
  },
});

export const disconnect = action({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await requireIdentity(ctx);
    const connection = await ctx.runQuery(
      internal.gmail.getConnectionInternal,
      {},
    );
    if (connection) {
      try {
        const token = await decryptRefreshToken(connection);
        await fetch(
          `https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(token)}`,
          { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } },
        );
      } catch (error) {
        console.error("Gmail token revocation failed", {
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
    await ctx.runMutation(internal.gmail.removeConnection, {});
    return null;
  },
});

export const createOAuthState = internalMutation({
  args: { stateHash: v.string(), expiresAt: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const expired = await ctx.db
      .query("gmailOAuthStates")
      .withIndex("by_expiresAt", (q) => q.lt("expiresAt", Date.now()))
      .take(50);
    for (const row of expired) {
      await ctx.db.delete("gmailOAuthStates", row._id);
    }
    await ctx.db.insert("gmailOAuthStates", args);
    return null;
  },
});

export const consumeOAuthState = internalMutation({
  args: { stateHash: v.string(), now: v.number() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("gmailOAuthStates")
      .withIndex("by_stateHash", (q) => q.eq("stateHash", args.stateHash))
      .unique();
    if (!row || row.expiresAt < args.now) {
      if (row) await ctx.db.delete("gmailOAuthStates", row._id);
      return false;
    }
    await ctx.db.delete("gmailOAuthStates", row._id);
    return true;
  },
});

export const saveConnection = internalMutation({
  args: {
    email: v.string(),
    encryptedRefreshToken: v.string(),
    tokenIv: v.string(),
    grantedScopes: v.array(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db.query("gmailConnections").first();
    if (existing) {
      await ctx.db.patch("gmailConnections", existing._id, {
        ...args,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("gmailConnections", {
        ...args,
        connectedAt: now,
        updatedAt: now,
      });
    }
    const workspace = await ctx.db.query("workspace").first();
    if (workspace) {
      await ctx.db.patch("workspace", workspace._id, {
        emailProvider: "gmail",
        emailFromAddress: args.email,
      });
    }
    return null;
  },
});

export const removeConnection = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const connection = await ctx.db.query("gmailConnections").first();
    if (connection) {
      await ctx.db.delete("gmailConnections", connection._id);
    }
    const workspace = await ctx.db.query("workspace").first();
    if (workspace?.emailProvider === "gmail") {
      await ctx.db.patch("workspace", workspace._id, {
        emailProvider: "resend",
      });
    }
    return null;
  },
});

export const getConnectionInternal = internalQuery({
  args: {},
  returns: v.union(
    v.object({
      email: v.string(),
      encryptedRefreshToken: v.string(),
      tokenIv: v.string(),
      grantedScopes: v.array(v.string()),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    const connection = await ctx.db.query("gmailConnections").first();
    if (!connection) return null;
    return {
      email: connection.email,
      encryptedRefreshToken: connection.encryptedRefreshToken,
      tokenIv: connection.tokenIv,
      grantedScopes: connection.grantedScopes,
    };
  },
});

const parseJson = async (response: Response): Promise<Record<string, unknown>> => {
  const value: unknown = await response.json();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Google returned an invalid response");
  }
  return value as Record<string, unknown>;
};

export const completeConnection = internalAction({
  args: { code: v.string(), state: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const validState = await ctx.runMutation(
      internal.gmail.consumeOAuthState,
      { stateHash: await sha256(args.state), now: Date.now() },
    );
    if (!validState) throw new Error("Gmail connection request expired");

    const { clientId, clientSecret, redirectUri } = gmailEnvironment();
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: args.code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokens = await parseJson(tokenResponse);
    if (!tokenResponse.ok) {
      throw new Error("Google rejected the Gmail authorization code");
    }
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error("Google did not return an offline Gmail grant");
    }

    const profileResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const profile = await parseJson(profileResponse);
    const email = profile.email;
    if (!profileResponse.ok || typeof email !== "string") {
      throw new Error("Could not identify the connected Gmail account");
    }

    const encrypted = await encryptRefreshToken(refreshToken);
    const grantedScopes =
      typeof tokens.scope === "string" ? tokens.scope.split(/\s+/) : [];
    if (!grantedScopes.includes(gmailSendScope)) {
      throw new Error("The Gmail send permission was not granted");
    }
    await ctx.runMutation(internal.gmail.saveConnection, {
      email: email.trim().toLowerCase(),
      ...encrypted,
      grantedScopes,
    });
    return null;
  },
});

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const { clientId, clientSecret } = gmailEnvironment();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const body = await parseJson(response);
  if (!response.ok || typeof body.access_token !== "string") {
    throw new Error("Gmail authorization has expired; reconnect Gmail");
  }
  return body.access_token;
};

const oneLine = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

const encodedHeader = (value: string): string =>
  `=?UTF-8?B?${bytesToBase64(new TextEncoder().encode(oneLine(value)))}?=`;

const wrapBase64 = (value: string): string =>
  value.match(/.{1,76}/g)?.join("\r\n") ?? value;

const htmlToText = (value: string): string => value
  .replace(/<br\s*\/?\s*>/gi, "\n")
  .replace(/<\/p\s*>/gi, "\n")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .trim();

const gmailSignature = async (accessToken: string, email: string): Promise<string> => {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/${encodeURIComponent(email)}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  const result = await parseJson(response);
  if (!response.ok || typeof result.signature !== "string") throw new Error("Could not read the Gmail signature. Reconnect Gmail and allow access to Gmail settings.");
  return result.signature.trim();
};

const mimeMessage = (args: {
  fromEmail: string;
  fromName?: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  signatureHtml?: string;
  trackingUrl?: string;
}): string => {
  const headers = [
    `From: ${args.fromName ? `${encodedHeader(args.fromName)} ` : ""}<${oneLine(args.fromEmail)}>`,
    `To: ${oneLine(args.to)}`,
    args.cc ? `Cc: ${oneLine(args.cc)}` : null,
    args.bcc ? `Bcc: ${oneLine(args.bcc)}` : null,
    `Subject: ${encodedHeader(args.subject)}`,
    "MIME-Version: 1.0",
    args.trackingUrl ? 'Content-Type: multipart/alternative; boundary="crm-boundary"' : 'Content-Type: text/plain; charset="UTF-8"',
    args.trackingUrl ? null : "Content-Transfer-Encoding: base64",
  ].filter((line): line is string => line !== null);
  if (!args.trackingUrl) {
    const signatureText = args.signatureHtml ? htmlToText(args.signatureHtml) : "";
    const body = wrapBase64(bytesToBase64(new TextEncoder().encode(signatureText ? `${args.body}\n\n${signatureText}` : args.body)));
    return `${headers.join("\r\n")}\r\n\r\n${body}`;
  }
  const signatureText = args.signatureHtml ? htmlToText(args.signatureHtml) : "";
  const plainBody = signatureText ? `${args.body}\n\n${signatureText}` : args.body;
  const html = args.body.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>\n") + (args.signatureHtml ? `<br><br>${args.signatureHtml}` : "") + `<img src="${args.trackingUrl}" width="1" height="1" alt="" style="display:none" />`;
  const plain = wrapBase64(bytesToBase64(new TextEncoder().encode(plainBody)));
  const rich = wrapBase64(bytesToBase64(new TextEncoder().encode(`<html><body>${html}</body></html>`)));
  return `${headers.join("\r\n")}\r\n\r\n--crm-boundary\r\nContent-Type: text/plain; charset="UTF-8"\r\nContent-Transfer-Encoding: base64\r\n\r\n${plain}\r\n--crm-boundary\r\nContent-Type: text/html; charset="UTF-8"\r\nContent-Transfer-Encoding: base64\r\n\r\n${rich}\r\n--crm-boundary--`;
};

export async function sendWithGmail(
  ctx: ActionCtx,
  args: {
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    body: string;
    fromName?: string;
    trackingUrl?: string;
  },
): Promise<string> {
  const connection = await ctx.runQuery(
    internal.gmail.getConnectionInternal,
    {},
  );
  if (!connection) throw new Error("Connect Gmail in Settings before sending");
  const refreshToken = await decryptRefreshToken(connection);
  const accessToken = await refreshAccessToken(refreshToken);
  const signatureHtml = canReadGmailSignature(connection.grantedScopes)
    ? await gmailSignature(accessToken, connection.email)
    : undefined;
  const raw = base64Url(
    new TextEncoder().encode(
      mimeMessage({
        fromEmail: connection.email,
        fromName: args.fromName,
        to: args.to,
        cc: args.cc,
        bcc: args.bcc,
        subject: args.subject,
        body: args.body,
        signatureHtml,
        trackingUrl: args.trackingUrl,
      }),
    ),
  );
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    },
  );
  const result = await parseJson(response);
  if (!response.ok || typeof result.id !== "string") {
    throw new Error("Gmail could not send this message");
  }
  return result.id;
}

// Used by outreach safety checks. Existing connections without the read scope
// simply return false until Gmail is reconnected with the updated permission.
export const hasInboundReply = internalAction({
  args: { email: v.string(), since: v.number() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const connection = await ctx.runQuery(internal.gmail.getConnectionInternal, {});
    if (!connection || !connection.grantedScopes.includes(gmailReadScope)) return false;
    const refreshToken = await decryptRefreshToken(connection);
    const accessToken = await refreshAccessToken(refreshToken);
    const after = Math.max(0, Math.floor(args.since / 1000));
    const query = `from:${args.email} after:${after}`;
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=1`, { headers: { Authorization: `Bearer ${accessToken}` } });
    const result = await parseJson(response);
    return response.ok && Array.isArray(result.messages) && result.messages.length > 0;
  },
});

// Search Gmail for delivery-failure notices and extract the failed recipient
// addresses. This is intentionally restricted to Google's mailer daemon and
// explicit delivery-failure fields so ordinary emails are never treated as
// bounces.
export const findBouncedAddresses = internalAction({
  args: { newerThanDays: v.number() },
  returns: v.object({ emails: v.array(v.object({ email: v.string(), messageId: v.string(), bouncedAt: v.optional(v.number()) })), searched: v.number(), message: v.string() }),
  handler: async (ctx, args) => {
    const connection = await ctx.runQuery(internal.gmail.getConnectionInternal, {});
    if (!connection) return { emails: [], searched: 0, message: "No Gmail connection found" };
    if (!connection.grantedScopes.includes(gmailReadScope)) return { emails: [], searched: 0, message: "Gmail is connected without the read/inbox scope; reconnect Gmail in Settings" };
    const refreshToken = await decryptRefreshToken(connection);
    const accessToken = await refreshAccessToken(refreshToken);
    // Match the delivery-failure language itself. Sender domains vary across
    // Gmail, Google Workspace, and Microsoft 365, while these phrases are
    // stable in the bounce body/snippet.
    const days = Math.max(1, Math.min(args.newerThanDays, 30));
    // Keep the Gmail query intentionally simple and search both common bounce
    // senders plus standard delivery-failure subjects. The MIME body is
    // inspected below, which avoids relying on Gmail indexing the full body.
    const query = `in:anywhere newer_than:${days}d {from:mailer-daemon from:postmaster subject:"Delivery Status Notification" subject:"Address not found"}`;
    const messageEntries: Array<{ id?: string }> = [];
    let pageToken: string | undefined;
    for (let page = 0; page < 10; page += 1) {
      const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
      url.searchParams.set("q", query);
      url.searchParams.set("maxResults", "100");
      if (pageToken) url.searchParams.set("pageToken", pageToken);
      const listResponse = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      const listed = await parseJson(listResponse);
      if (!listResponse.ok || !Array.isArray(listed.messages)) return { emails: [], searched: messageEntries.length, message: `Gmail search failed (${listResponse.status})` };
      messageEntries.push(...(listed.messages as Array<{ id?: string }>));
      pageToken = typeof listed.nextPageToken === "string" ? listed.nextPageToken : undefined;
      if (!pageToken) break;
    }
    const found = new Map<string, { messageId: string; bouncedAt?: number }>();
    for (const entry of messageEntries) {
      if (!entry.id) continue;
      const messageResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${entry.id}?format=full`, { headers: { Authorization: `Bearer ${accessToken}` } });
      const message = await parseJson(messageResponse);
      const chunks: string[] = [];
      const walk = (part: unknown): void => {
        if (!part || typeof part !== "object") return;
        const value = part as { body?: { data?: unknown }; parts?: unknown[] };
        if (typeof value.body?.data === "string") {
          try { chunks.push(new TextDecoder().decode(base64ToBytes(value.body.data))); } catch { /* ignore malformed MIME parts */ }
        }
        for (const child of value.parts ?? []) walk(child);
      };
      walk(message.payload);
      const text = `${typeof message.snippet === "string" ? message.snippet : ""}\n${chunks.join("\n")}`;
      const patterns = [
        /Your message wasn['’]t delivered to\s*<?([^\s<>]+)>?/i,
        /Your message to\s*<?([^\s<>]+)>?\s+couldn['’]t be delivered/i,
        /Your message to\s*<?([^\s<>]+)>?\s+wasn['’]t delivered/i,
        /(?:message|delivery)\s+(?:to|for)\s*<?([^\s<>]+)>?\s+(?:was|failed|couldn't|could not)/i,
        /Final-Recipient:\s*rfc822;\s*([^\s<>\r\n]+)/i,
      ];
      for (const pattern of patterns) {
        const match = text.match(pattern);
        const email = match?.[1]?.trim().toLowerCase();
        if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          found.set(email, { messageId: entry.id, bouncedAt: typeof message.internalDate === "string" ? Number(message.internalDate) || undefined : undefined });
        }
      }
    }
    return { emails: [...found.entries()].map(([email, value]) => ({ email, ...value })), searched: messageEntries.length, message: "Gmail search completed" };
  },
});
