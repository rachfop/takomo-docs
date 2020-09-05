const currentRelease = process.env.CURRENT_RELEASE || 'next'

module.exports = {
  title: 'Takomo',
  tagline: 'Organize, parameterize and deploy CloudFormation stacks',
  url: 'https://takomo.io',
  baseUrl: process.env.DOCS_BASE || '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'takomo-io',
  projectName: 'Takomo',
  plugins: [],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    googleAnalytics: {
      trackingID: 'UA-165592316-1',
    },
    algolia: {
      apiKey: '34a9b39ce6857682820980ace4f5fa1c',
      indexName: 'takomo'
    },
    navbar: {
      title: 'Takomo ' + currentRelease,
      hideOnScroll: true,
      logo: {
        alt: 'Takomo logo',
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
          href: `https://takomo.io/api-docs/release/${currentRelease.replace(/\./g, '-')}/`,
          label: 'API',
          position: 'left',
        },
        {
          to: 'versions/',
          label: 'All versions',
          position: 'right',
        },
        {
          href: 'https://github.com/takomo-io/takomo',
          className: 'header-github-link',
          position: 'right',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: 'docs',
            },
            {
              label: 'Installation',
              to: 'docs/getting-started/installation',
            },
            {
              label: 'Examples',
              to: 'docs/examples/about',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Gitter',
              to: 'https://gitter.im/takomo-io/community',
            },
          ],
        },
      ],
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
         // disableVersioning: true,
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
