require("dotenv").config({ path: ".env" });
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [
          // { key: "X-Frame-Options", value: "SAMEORIGIN", key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://dmrooqbmxdhdyblqzswu.supabase.co",
          },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  output: "standalone",
};

if (parseInt(process.env.NEXT_PUBLIC_ENABLE_SENTRY || "0")) {
  module.exports = withSentryConfig(nextConfig, { silent: true }, { hideSourceMaps: true });
} else {
  module.exports = nextConfig;
}
