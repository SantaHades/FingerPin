/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/핑거핀',
        destination: '/fingerpin',
      },
      {
        source: '/%ED%95%91%EA%B1%B0%ED%95%80',
        destination: '/fingerpin',
      },
      {
        source: '/fp',
        destination: '/fingerpin',
      },
      {
        source: '/전자영수증광고',
        destination: '/fingerpin',
      },
      {
        source: '/%EC%A0%84%EC%9E%90%EC%98%81%EC%88%98%EC%A6%9D%EA%B4%91%EA%B3%A0',
        destination: '/fingerpin',
      },
    ]
  },
}

export default nextConfig
