/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://aicalculators.org",
  generateRobotsTxt: true,
  output: "export",
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.6;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path.startsWith("/blog/") && path !== "/blog") {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/blog") {
      priority = 0.7;
      changefreq = "weekly";
    } else if (["/about", "/privacy"].includes(path)) {
      priority = 0.4;
      changefreq = "yearly";
    } else {
      // Calculator pages
      priority = 0.8;
      changefreq = "weekly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
