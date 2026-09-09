export type CsvRow = Record<string, string>;

export function parseCsv(input: string): CsvRow[] {
  const firstLine = input.split(/\r?\n/, 1)[0] ?? "";
  const delimiter = firstLine.includes("\t") && !firstLine.includes(",") ? "\t" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quoted) {
      if (char === '"' && input[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"' && cell.length === 0) quoted = true;
    else if (char === delimiter) { row.push(cell); cell = ""; }
    else if (char === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += char;
  }
  if (cell || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
  // Outscraper exports can include a UTF-8 BOM before the first header.
  // Strip it so the first column is recognized as `name`.
  const headers = (rows.shift() ?? []).map((header) => header.replace(/^\uFEFF/, "").trim().toLowerCase());
  return rows.filter((values) => values.some((value) => value.trim())).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() ?? "" as string])),
  );
}

export function csvText(rows: Array<Record<string, unknown>>): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const text = String(value ?? "");
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((key) => escape(row[key])).join(","))].join("\r\n");
}

export function downloadCsv(filename: string, rows: Array<Record<string, unknown>>) {
  const blob = new Blob([csvText(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
