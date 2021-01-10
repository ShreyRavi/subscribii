const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---privacy-policy-md": hot(preferDefault(require("/home/st/Code/subscribii/PrivacyPolicy.md"))),
  "component---readme-md": hot(preferDefault(require("/home/st/Code/subscribii/README.md"))),
  "component---src-components-header-mdx": hot(preferDefault(require("/home/st/Code/subscribii/src/components/Header.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/st/Code/subscribii/.docz/src/pages/404.js"))),
  "component---src-subscribii-app-mdx": hot(preferDefault(require("/home/st/Code/subscribii/src/SubscribiiApp.mdx")))
}

