import * as fs from "fs";
import { getAllPosts } from "../utils/api";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }: any) => {
  const BASE_URL = "https://huntertrammell.dev";

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "_app.tsx",
        "_document.tsx",
        "sitemap.xml.tsx",
        "index.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    });

  const posts = getAllPosts(["slug"]);

  const dynamicPaths = posts.map((post) => {
    return `${BASE_URL}/blog/${post.slug}`;
  });

  const allPaths = [`${BASE_URL}/`, ...staticPaths, ...dynamicPaths];

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
