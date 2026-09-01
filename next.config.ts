import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serve the self-contained Abacus Builders demo at a clean, extension-less URL.
      { source: "/abacusbuilders/demo", destination: "/abacusbuilders/demo.html" },
    ];
  },
};

export default nextConfig;
