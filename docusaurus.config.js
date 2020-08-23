module.exports = {
  title: 'Takomo',
  tagline: 'Organize, parameterize and deploy CloudFormation stacks',
  url: 'https://takomo.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'takomo-io',
  projectName: 'Takomo',
  plugins: [],
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-165592316-1',
    },
    navbar: {
      title: 'Takomo',
      logo: {
        alt: 'Takomo Logo',
        src: 'img/takomo-logo-sm.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'versions/',
          label: 'All versions',
          position: 'right',
        },
        {
          href: 'https://github.com/takomo-io/takomo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      /*
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],*/
      copyright: `Copyright © ${new Date().getFullYear()} Takomo. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          homePageId: 'getting-started/introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          disableVersioning: true,
        },
        blog: {
          showReadingTime: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          sidebarCollapsible: false
        },
      },
    ],
  ],
};
