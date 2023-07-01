/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}