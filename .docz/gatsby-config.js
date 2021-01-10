const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Subscribii',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/home/st/Code/subscribii/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Subscribii',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/home/st/Code/subscribii',
          templates:
            '/home/st/Code/subscribii/node_modules/docz-core/dist/templates',
          docz: '/home/st/Code/subscribii/.docz',
          cache: '/home/st/Code/subscribii/.docz/.cache',
          app: '/home/st/Code/subscribii/.docz/app',
          appPackageJson: '/home/st/Code/subscribii/package.json',
          appTsConfig: '/home/st/Code/subscribii/tsconfig.json',
          gatsbyConfig: '/home/st/Code/subscribii/gatsby-config.js',
          gatsbyBrowser: '/home/st/Code/subscribii/gatsby-browser.js',
          gatsbyNode: '/home/st/Code/subscribii/gatsby-node.js',
          gatsbySSR: '/home/st/Code/subscribii/gatsby-ssr.js',
          importsJs: '/home/st/Code/subscribii/.docz/app/imports.js',
          rootJs: '/home/st/Code/subscribii/.docz/app/root.jsx',
          indexJs: '/home/st/Code/subscribii/.docz/app/index.jsx',
          indexHtml: '/home/st/Code/subscribii/.docz/app/index.html',
          db: '/home/st/Code/subscribii/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
