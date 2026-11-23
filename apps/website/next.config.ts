import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const nextConfig: NextConfig = {
  turbopack: {
    root: repoRoot,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.newrevgen.com" }],
        destination: "https://newrevgen.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Serve the self-contained Abacus Builders demo at a clean, extension-less URL.
      { source: "/abacusbuilders/demo", destination: "/abacusbuilders/demo.html" },
    ];
  },
};

export default nextConfig;
