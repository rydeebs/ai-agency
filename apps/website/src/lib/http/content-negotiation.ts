const representations = ["text/html", "text/markdown"] as const;

export type Representation = (typeof representations)[number];

interface AcceptEntry {
  type: string;
  quality: number;
  specificity: number;
  position: number;
}

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw, position) => {
      const [rawType = "", ...parameters] = raw
        .trim()
        .split(";")
        .map((value) => value.trim());
      let quality = 1;

      for (const parameter of parameters) {
        const [rawName, rawValue] = parameter
          .split("=")
          .map((value) => value.trim());
        if (rawName.toLowerCase() !== "q") continue;

        const parsed = Number(rawValue);
        if (!Number.isNaN(parsed)) {
          quality = Math.max(0, Math.min(1, parsed));
        }
      }

      const type = rawType.toLowerCase();
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;

      return { type, quality, specificity, position };
    })
    .filter((entry) => entry.type.length > 0);
}

function matches(entry: AcceptEntry, candidate: Representation): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

export function preferredRepresentation(
  acceptHeader: string | null,
): Representation | null {
  if (!acceptHeader) return representations[0];

  const entries = parseAccept(acceptHeader);
  if (entries.length === 0) return representations[0];

  let bestRepresentation: Representation | null = null;
  let bestQuality = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of representations) {
    let matchedEntry: AcceptEntry | null = null;

    for (const entry of entries) {
      if (!matches(entry, candidate)) continue;

      if (
        matchedEntry === null ||
        entry.specificity > matchedEntry.specificity ||
        (entry.specificity === matchedEntry.specificity &&
          entry.position < matchedEntry.position)
      ) {
        matchedEntry = entry;
      }
    }

    if (!matchedEntry || matchedEntry.quality <= 0) continue;

    if (
      matchedEntry.quality > bestQuality ||
      (matchedEntry.quality === bestQuality &&
        matchedEntry.position < bestPosition)
    ) {
      bestRepresentation = candidate;
      bestQuality = matchedEntry.quality;
      bestPosition = matchedEntry.position;
    }
  }

  return bestRepresentation;
}

export function appendVary(headers: Headers, fieldName: string): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", fieldName);
    return;
  }

  const fields = existing.split(",").map((field) => field.trim().toLowerCase());
  if (!fields.includes(fieldName.toLowerCase())) {
    headers.set("Vary", `${existing}, ${fieldName}`);
  }
}
