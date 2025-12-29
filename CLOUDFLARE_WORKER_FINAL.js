// === CLOUDFLARE WORKER - FINAL VERSIE ===
// Voor zwijsen.net - Routes naar Vercel of WordPress

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Normaliseer pathname - verwijder trailing slash behalve voor root
    const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");

    // ============================================
    // CONFIGURATIE
    // ============================================
    const VERCEL_DOMAIN = "zwijsen-eta.vercel.app";

    const VERCEL_ROUTES = [
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
      "/portfolio",
    ];

    // ============================================
    // ROUTING LOGIC
    // ============================================

    // PRIORITEIT 1: WordPress assets moeten ALTIJD naar WordPress origin
    // Anders werken images niet op Vercel-pagina's
    if (pathname.startsWith("/wp-content/") || pathname.startsWith("/wp-includes/")) {
      const response = await fetch(request);
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set("X-Proxy-Target", "WordPress-Assets");
      return modifiedResponse;
    }

    // PRIORITEIT 2: Vercel static assets (images folder)
    // Deze zitten in de Vercel build en moeten naar Vercel
    if (pathname.startsWith("/images/") || pathname.startsWith("/assets/")) {
      const vercelUrl = `https://${VERCEL_DOMAIN}${pathname}${url.search}`;
      const vercelRequest = new Request(vercelUrl, {
        method: request.method,
        headers: request.headers,
        redirect: "follow",
      });
      const response = await fetch(vercelRequest);
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set("X-Proxy-Target", "Vercel-Images");
      return modifiedResponse;
    }

    // PRIORITEIT 3: Check of dit een Vercel route is
    let shouldProxyToVercel = VERCEL_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    if (shouldProxyToVercel) {
      // === PROXY NAAR VERCEL ===
      const vercelUrl = `https://${VERCEL_DOMAIN}${pathname}${url.search}`;

      const vercelRequest = new Request(vercelUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: "follow",
      });

      const response = await fetch(vercelRequest);
      const modifiedResponse = new Response(response.body, response);

      // Debug headers (optioneel - verwijder in productie)
      modifiedResponse.headers.set("X-Proxy-Target", "Vercel");
      modifiedResponse.headers.set("X-Vercel-Domain", VERCEL_DOMAIN);

      return modifiedResponse;
    }

    // === DEFAULT: WORDPRESS ===
    const response = await fetch(request);
    const modifiedResponse = new Response(response.body, response);

    // Debug header (optioneel)
    modifiedResponse.headers.set("X-Proxy-Target", "WordPress");

    return modifiedResponse;
  },
};
