// Cloudflare Worker voor zwijsen.net
// Routeert specifieke paden naar Vercel, rest naar WordPress

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Don't redirect asset requests (CSS, JS, images, fonts, etc.)
    const assetExtensions = /\.(css|js|jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot|ico|map)$/i;
    const isAssetRequest = assetExtensions.test(path);

    // Redirect www to non-www (301 permanent redirect) - but NOT for assets
    if (url.hostname.startsWith("www.") && !isAssetRequest) {
      const newUrl = new URL(request.url);
      newUrl.hostname = url.hostname.replace(/^www\./, "");
      return Response.redirect(newUrl.toString(), 301);
    }

    // Verwijder trailing slash (behalve root)
    if (path !== "/" && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    // ====================
    // 1) VERCEL ROUTES (React App - Regio's)
    // ====================
    const vercelRoutes = [
      "/regios",
      "/hilversum",
      "/loenen-aan-de-vecht",
      "/loosdrecht",
      "/utrecht",
      "/bilthoven",
      "/breukelen",
      "/maarssen",
      "/stichtse-vecht",
      "/het-gooi",
      "/blaricum",
      "/laren",
      "/wijdemeren",
      "/kortenhoef",
      "/vreeland",
    ];

    const isVercelRoute = vercelRoutes.some(
      (route) => path === route || path.startsWith(route + "/")
    ) || path.startsWith("/assets/");

    if (isVercelRoute) {
      const VERCEL_URL = "zwijsen-eta.vercel.app"; // Jouw Vercel deployment URL

      // Proxy naar Vercel
      const vercelUrl = new URL(request.url);
      vercelUrl.hostname = VERCEL_URL;
      vercelUrl.protocol = "https:";

      const modifiedRequest = new Request(vercelUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: "manual",
      });

      // BELANGRIJK: Verwijder Host header conflicten
      modifiedRequest.headers.delete("Host");

      const response = await fetch(modifiedRequest);

      // Clone response en voeg debug header toe
      const newResponse = new Response(response.body, response);
      newResponse.headers.set("X-Zwijsen-Proxy", "vercel");
      newResponse.headers.set("X-Vercel-Target", VERCEL_URL);

      return newResponse;
    }

    // ====================
    // 2) WORDPRESS ROUTES (Standaard)
    // ====================
    // Alles wat NIET in vercelRoutes zit, gaat naar WordPress origin
    const response = await fetch(request);

    // Clone en voeg debug header toe
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("X-Zwijsen-Proxy", "wordpress");

    return newResponse;
  },
};
