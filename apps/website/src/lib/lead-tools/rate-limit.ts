import { createHash } from "node:crypto";

interface RateRecord {
  count: number;
  resetsAt: number;
}

const globalRateStore = globalThis as typeof globalThis & {
  newRevGenRateLimits?: Map<string, RateRecord>;
};

const store = globalRateStore.newRevGenRateLimits ?? new Map<string, RateRecord>();
globalRateStore.newRevGenRateLimits = store;

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip") || "unknown";
  const salt = process.env.RATE_LIMIT_SALT ?? process.env.CONVEX_LEAD_INGEST_SECRET ?? "newrevgen";
  return createHash("sha256").update(`${salt}:${address}`).digest("hex");
}

export function consumeRateLimit(args: {
  namespace: string;
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const storageKey = `${args.namespace}:${args.key}`;
  const current = store.get(storageKey);
  if (!current || current.resetsAt <= now) {
    store.set(storageKey, { count: 1, resetsAt: now + args.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (current.count >= args.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetsAt - now) / 1000)),
    };
  }
  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

