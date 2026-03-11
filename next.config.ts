import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    localPatterns: [
      {
        pathname: '/images/ai-reports/**',
      },
    ],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
