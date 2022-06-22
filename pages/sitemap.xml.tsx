import * as fs from "fs";
import { getAllPosts } from "../utils/api";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }: any) => {
  const BASE_URL = "https://huntertrammell.dev";
  const BASE_DIR = process.env.NODE_ENV === "production" ? "./" : "pages";

  const staticPaths = fs
    .readdirSync(BASE_DIR)
    .filter((staticPage) => {
      return ![
        "api",
        "_app.tsx",
        "_document.tsx",
        "sitemap.xml.tsx",
        "index.tsx",
        ".next",
        "package.json",
        "___next_launcher.cjs",
        "___vc",
        "_posts",
        "node_modules",
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
              <changefreq>weekly</changefreq>
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
