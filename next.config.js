/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn.sportmonks.com',
            port: '',
            pathname: '/images/soccer/teams/'
         }
      ],
      domains: ['res.cloudinary.com', 'api.sofascore.app']
   }
};

module.exports = nextConfig;
