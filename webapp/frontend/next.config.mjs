/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendPort = process.env.BACKEND_PORT || '3001';
    return [
      {
        source: '/api/:path*',
        destination: `http://127.0.0.1:${backendPort}/api/:path*`,
      },
      {
        source: '/images/:path*',
        destination: `http://127.0.0.1:${backendPort}/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
