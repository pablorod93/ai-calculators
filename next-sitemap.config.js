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
};
