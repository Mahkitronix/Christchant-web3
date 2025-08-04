const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME || 'ChristChant',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'yt3.googleusercontent.com',
      'is1-ssl.mzstatic.com',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = nextConfig
