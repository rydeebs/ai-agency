interface JsonLdProps {
  /** Pre-serialized, script-safe JSON from `jsonLdGraph`. */
  json: string;
}

export function JsonLd({ json }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
