import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Las fotos de origen son chicas (salen de los brochures): 80 alcanza y no infla el peso.
    qualities: [80],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
