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
      {
        pathname: '/wechat-qr.png',
      },
      {
        pathname: '/wechat-qr.jpg',
      },
      {
        pathname: '/wechat-qr.jpeg',
      },
      {
        pathname: '/wechat-qr.JPG',
      },
      {
        pathname: '/wechat-qr.JPEG',
      },
      {
        pathname: '/wechat-qr.webp',
      },
      {
        pathname: '/wechat-qr.WEBP',
      },
    ],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
