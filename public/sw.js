if (!self.define) {
  let e,
    a = {};
  const i = (i, s) => (
    (i = new URL(i + ".js", s).href),
    a[i] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = a), document.head.appendChild(e);
        } else (e = i), importScripts(i), a();
      }).then(() => {
        let e = a[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[c]) return;
    let o = {};
    const t = (e) => i(e, c),
      f = { module: { uri: c }, exports: o, require: t };
    a[c] = Promise.all(s.map((e) => f[e] || t(e))).then((e) => (n(...e), o));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/-iR1VNEHNg624lNSVoQPg/_buildManifest.js",
          revision: "b222cbf4d8e1f47e27a8925222733e53",
        },
        {
          url: "/_next/static/-iR1VNEHNg624lNSVoQPg/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0e762574-c016d6ba6935b977.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/13b76428-2766062259657f3c.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/160b575a-fba899371fa3fe3d.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/2104-21f03ecc98064acc.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/3489-e218dda97d3223c3.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/4593-585da388a3c67d24.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/4673-136ed19ef4ae41a9.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/479ba886-fa16504a3c081be5.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/5190-1227b2635395c15e.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/52ab8b6c-329f3821700b4dc8.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/53c13509-e2590ff62f0c459f.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/5416-a8360217c99d1f0c.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/59650de3-d7a2fa24df05c7e0.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/5e22fd23-88f8c914cb8d84a2.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/619edb50-facd8d2c99032399.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/7035.cb726032edead13d.js",
          revision: "cb726032edead13d",
        },
        {
          url: "/_next/static/chunks/7138-9ea1715752ec6fc8.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/7363-d300bc9ec54595c8.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/795d4814-52bd805f17eb10e1.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/8005-c0bbcfff403d8d94.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/8472-e4561d44a3fc0674.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/8e1d74a4-b6cbbcdb848ecf45.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/94730671-0acafebab49e3592.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/987-b0b60f7cba6d1766.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/9c4e2130-42661af25c0685b6.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(auth)/sign-in/page-2eb16ee9df03740d.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(auth)/sign-up/page-b8f9625caeaccc8d.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/about/page-50a2410a22aeec0c.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/add-post/page-614de3aa45dd0a85.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/fallback/page-e9302c7e490100f9.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/find-account/page-07694fe8be8df703.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/layout-0abb5533c90fc851.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/notFound/page-a8ff433af536662e.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/overViwe/page-bd505e4bbeb5e3dc.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/page-c37e6ab7c70badf0.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/postDetail/%5Bid%5D/page-f17eec90da1a53f4.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/profile/page-41eb9510422fee59.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/reset-pass/page-3371646c1da57aa8.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/search/page-8ef03cba258c69ee.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/send-otp/page-ec74b81562d2c2f7.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/setting-page/page-83a4c9e1fcecc5c4.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/userPage/%5BuserId%5D/page-925ba8f6ef6f6915.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-52ba6b9c244f1786.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/ee560e2c-9fabc7856865f08e.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/f8025e75-631748b7a68af5a3.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/f97e080b-5a0429b631b44ef7.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/fca4dd8b-a0eb44c8c46ff5ad.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/fd9d1056-58315da26b4b30cc.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/framework-a63c59c368572696.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/main-4c1764ea5a3f6a08.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/main-app-e80f2288279d42d8.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/pages/_app-00b74eae5e8dab51.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-a8c53d88a2870131.js",
          revision: "-iR1VNEHNg624lNSVoQPg",
        },
        {
          url: "/_next/static/css/36c996bead66e879.css",
          revision: "36c996bead66e879",
        },
        { url: "/favicon.ico", revision: "ba40fe79999089ffb0dc9b599c1f8f8d" },
        {
          url: "/font/Woff/IRANSansXFaNum-Black.woff",
          revision: "f58751b243ad8445eb81a989c2ca2736",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-Bold.woff",
          revision: "8e724a4a15cc86feeb16030ee6c75ae9",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-DemiBold.woff",
          revision: "5012991719fbad66852682cca29a31e7",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-ExtraBold.woff",
          revision: "db633a766fbb1252a4e407ca894734d5",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-Light.woff",
          revision: "50c029d5af7e0892cf035349bb19c10e",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-Medium.woff",
          revision: "4a471769956e95b593a91923b5ef0ccc",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-Regular.woff",
          revision: "5d6bb45f442ac1f466520c022f767471",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-Thin.woff",
          revision: "53667eb895e2329bc2dcd55322aec907",
        },
        {
          url: "/font/Woff/IRANSansXFaNum-UltraLight.woff",
          revision: "4303e3371f8f955896213410a3389198",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-Black.woff2",
          revision: "53755bc620462de7ec4b5f111a8fe4ef",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-Bold.woff2",
          revision: "3c27166cc04640cfc4fbd4126168af31",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-DemiBold.woff2",
          revision: "c2f0c76753a7866bd0d1694e0b064a68",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-ExtraBold.woff2",
          revision: "cf448caf659cab6ef04b5320047d5931",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-Light.woff2",
          revision: "7b194dcabb4de7313e21decf730fda2e",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-Medium.woff2",
          revision: "0396719fa0baa4c4f93883b489d7cbfa",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-Regular.woff2",
          revision: "09ee054fd9cc9c49d8d66335b367e003",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-Thin.woff2",
          revision: "83f0f40c18ae76ef0062fda2ed7d2b37",
        },
        {
          url: "/font/Woff2/IRANSansXFaNum-UltraLight.woff2",
          revision: "85c6ae62821d3045f3eddd262e3dc65f",
        },
        { url: "/icon/144.png", revision: "c8b253828d3f0fbbfc01f909ed078b68" },
        { url: "/icon/180.png", revision: "4d0b1364a6c42554004c9b766f6cbf3e" },
        { url: "/icon/192.png", revision: "640d6db0ddf13feaefef9d1113455cd7" },
        { url: "/icon/320.png", revision: "bd40f9817532a28de89dbc7bdfd90f56" },
        { url: "/icon/48.png", revision: "10f73c3b387b2930346adef046c828ca" },
        { url: "/icon/512.png", revision: "638bfbda272e5cfaf188dba4be8d1a91" },
        { url: "/icon/64.png", revision: "3995c22f2c7837651f8aa0344548bad7" },
        { url: "/icon/96.png", revision: "160c517d76eee248a51b30a9019eed7e" },
        {
          url: "/image/code.png",
          revision: "4d458b3aec8fca28ab6e3f1eb9be4e63",
        },
        {
          url: "/image/findAccount.png",
          revision: "d9ba3d0b1af30fb98424ac3fa20a21e6",
        },
        {
          url: "/image/gitt.jpg",
          revision: "6607f2631a40b8d7f84f3bb31897a306",
        },
        {
          url: "/image/info.png",
          revision: "417fa22aa3d2e8f9de06684a2e0f3530",
        },
        {
          url: "/image/insta.jpg",
          revision: "e398c3a275d3d9c8e3361a896364406b",
        },
        {
          url: "/image/install-app.png",
          revision: "1d374a0511543900c899105dfbd1346f",
        },
        {
          url: "/image/iran.png",
          revision: "54a931f4d28f6099d8f400b04276ef60",
        },
        {
          url: "/image/logo.png",
          revision: "e8f3a89397ab3ca6d6db5480c824d64b",
        },
        {
          url: "/image/notFound.png",
          revision: "cf4a706ac6baa3962c28b1369ee09b41",
        },
        {
          url: "/image/phone.png",
          revision: "9c6f9fda0d0a4ca02d13c19bf56d5869",
        },
        {
          url: "/image/phones.png",
          revision: "07a92c721b45c21761df80ce6eecd818",
        },
        {
          url: "/image/post.png",
          revision: "4f0c7266a4eff84e13359640db2ecfaf",
        },
        {
          url: "/image/resetPass.png",
          revision: "8f77ff4eaaf55c45a1cd151f896a331e",
        },
        {
          url: "/image/search.png",
          revision: "b31acf46e73dcb307d8dfdec9ae2ce2f",
        },
        {
          url: "/image/setting.png",
          revision: "47c53ab2ec680de48d4c2565f4f6ea23",
        },
        {
          url: "/image/signUp.png",
          revision: "faa7466a32f9c84275ead1dbd9e7a810",
        },
        { url: "/image/tel.jpg", revision: "0e614feb5bbf217faa793d4596e9d196" },
        { url: "/image/usa.png", revision: "2822f08635ba028c6928d633a4416951" },
        {
          url: "/image/userNF.png",
          revision: "4e437cd3f924fd989bbf557d8fa6875e",
        },
        {
          url: "/image/whatsapp.jpg",
          revision: "fde1eb2c105d86224e71690d5b1fdd46",
        },
        { url: "/manifest.json", revision: "b41d419de0375c58e6fe4bbbc35ac71c" },
        { url: "/me/1.jpg", revision: "6053f4f55d75aec4b9fc675b6cc5dfde" },
        { url: "/me/2.jpg", revision: "6fecfd8661b59de96cd68231ec45aa06" },
        { url: "/me/3.jpg", revision: "cb9ab18d800a4c14b2e4b596d09ac6e0" },
        { url: "/me/4.jpg", revision: "8c7d1a95411cc995892a16c83e1b413d" },
        { url: "/me/5.jpg", revision: "7c3dee87c72025116551786bae9868cb" },
        { url: "/me/6.jpg", revision: "bb4fe6b93c396784f42b5a70e7c8de11" },
        {
          url: "/swe-worker-5c72df51bb1f6ee0.js",
          revision: "5a47d90db13bb1309b25bdf7b363570e",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith("/api/auth/callback") || !a.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: i }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        i &&
        !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: i }) =>
        "1" === e.headers.get("RSC") && i && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    ),
    (self.__WB_DISABLE_DEV_LOGS = !0);
});
