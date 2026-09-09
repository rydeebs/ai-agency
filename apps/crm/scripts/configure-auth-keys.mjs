import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

const production = process.argv.includes("--prod");
const siteArgument = process.argv.find((arg) => arg.startsWith("--site-url="));
const siteUrl = siteArgument?.slice("--site-url=".length);

if (production && !siteUrl) {
  console.error(
    "Production requires --site-url=https://your-production-host.convex.site",
  );
  process.exit(1);
}

const pair = await generateKeyPair("RS256", { extractable: true });
const privateKey = (await exportPKCS8(pair.privateKey))
  .trimEnd()
  .replace(/\n/g, " ");
const publicKey = await exportJWK(pair.publicKey);

const values = {
  JWT_PRIVATE_KEY: privateKey,
  JWKS: JSON.stringify({ keys: [{ use: "sig", ...publicKey }] }),
  SITE_URL: siteUrl ?? "http://127.0.0.1:5173",
  GMAIL_TOKEN_ENCRYPTION_KEY: randomBytes(32).toString("base64"),
};

for (const [name, value] of Object.entries(values)) {
  const args = ["convex", "env", "set", `${name}=${value}`];
  if (production) args.push("--prod");
  const result = spawnSync("npx", args, {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
  console.log(`Set ${name}${production ? " on production" : ""}`);
}
