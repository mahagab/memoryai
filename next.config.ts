
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/chat",
        destination: "http://api-app.us-east-1.elasticbeanstalk.com/chat",
      },
    ];
  },
};

module.exports = nextConfig;
