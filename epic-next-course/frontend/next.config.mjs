/** @type {import('next').NextConfig} */
const nextConfig = {images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**/*",
    },
    {
      protocol: "https",
      hostname: "clever-dawn-ec1866942d.media.strapiapp.com",
    },
  ],
},};

export default nextConfig;