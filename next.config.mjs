/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["localhost", "apidev.nepalhomes.com"],
        remotePatterns: [
          {
            hostname: "localhost",
          },
        ],
      },
};

export default nextConfig;
