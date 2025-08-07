/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات Service Worker
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          },
          {
            key: 'Content-Type',
            value: 'application/javascript'
          }
        ]
      }
    ];
  },
  
  // إعدادات إضافية
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
