/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/how-to-create-a-dynamic-modal-component-in-react",
        destination: "/blog/how-to-create-a-dynamic-modal-component-in-react",
        permanent: true,
      },
      {
        source:
          "/the-beginners-guide-to-building-production-ready-apps-with-nextjs-part-one-the-what-how-and-why-of-nextjs",
        destination: "/blog/building-production-apps-with-nextjs",
        permanent: true,
      },
      {
        source:
          "/how-to-use-the-intersection-observer-api-to-lazy-load-your-images",
        destination: "/blog/intersection-observer-lazy-load",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tag/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/how-to-post-articles-from-your-existing-cms-using-the-hashnode-api",
        destination: "/blog/how-to-post-articles-to-hashnode-from-cms",
        permanent: true,
      },
      {
        source: "/getting-started-with-serverless-functions-on-netlify",
        destination:
          "/blog/getting-started-with-serverless-functions-on-netlify",
        permanent: true,
      },
      {
        source:
          "/5-reasons-why-you-should-use-codewell-for-your-next-portfolio-project",
        destination:
          "/blog/why-you-should-use-codewell-for-your-next-portfolio",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
