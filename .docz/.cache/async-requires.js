// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---privacy-policy-md": () => import("./../../../../PrivacyPolicy.md" /* webpackChunkName: "component---privacy-policy-md" */),
  "component---readme-md": () => import("./../../../../README.md" /* webpackChunkName: "component---readme-md" */),
  "component---src-components-controls-mdx": () => import("./../../../../src/components/Controls.mdx" /* webpackChunkName: "component---src-components-controls-mdx" */),
  "component---src-components-header-mdx": () => import("./../../../../src/components/Header.mdx" /* webpackChunkName: "component---src-components-header-mdx" */),
  "component---src-pages-404-js": () => import("./../../../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-subscribii-app-mdx": () => import("./../../../../src/SubscribiiApp.mdx" /* webpackChunkName: "component---src-subscribii-app-mdx" */)
}

