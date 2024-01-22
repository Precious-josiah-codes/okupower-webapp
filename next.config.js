/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "ymagbucgtqslgnvgaxfk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "swiperjs.com",
      },
    ],
  },
};

module.exports = nextConfig;
