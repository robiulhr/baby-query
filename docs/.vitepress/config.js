import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Baby Query',
  description: 'Write Less, Do More.',
  base:"/baby-query/",
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/img/favicon_io/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/favicon_io/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/favicon_io/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/img/favicon_io/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/img/favicon_io/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/img/favicon_io/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    ['meta', { name: "msapplication-config", content: "/img/favicon_io/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  themeConfig: {
    logo: '/img/logo/baby-query-logo.png',
    siteTitle: 'Baby Query',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Docs', link: '/docs/introduction', activeMatch: '/docs/' },
      { text: 'Author', link: 'https://robiulhr.github.io/' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/docs/introduction' },
            { text: 'Installation', link: '/docs/installation' },
            { text: 'Contribute', link: '/docs/contribute' }
          ]
        },
        {
          text: 'Table of content',
          items: [
            {
              text: 'CSS Methods',
              collapsed: true,
              items: [
                { text: '.after()', link: '/docs/css/after' },
                { text: '.attr()', link: '/docs/css/attr' },
                { text: '.css()', link: '/docs/css/css' }
              ]
            },
            {
              text: 'Effects',
              collapsed: true,
              items: [{ text: '.toggle()', link: '/docs/effects/toggle' }]
            },
            {
              text: 'Array Methods',
              collapsed: true,

              items: [{ text: '.each()', link: '/docs/array/each' }]
            },
            {
              text: 'Object Methods',
              collapsed: true,
              items: [{ text: '.each()', link: '/docs/object/' }]
            },
            {
              text: 'Events',
              collapsed: true,
              items: [{ text: '.on()', link: '/docs/events/on' }]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/robiulhr/baby-query' }
    ],
    footer: {
      message: 'Released under the MIT License.'
    }
  }
})
