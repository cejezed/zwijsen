// === CLOUDFLARE WORKER - DEBUG VERSIE ===
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
    ];

    // ============================================
    // ROUTING LOGIC
    // ============================================

    // Check: Is dit een Vercel route?
    const shouldProxyToVercel = VERCEL_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Debug logging
    console.log("=== WORKER DEBUG ===");
    console.log("Original URL:", url.href);
    console.log("Original pathname:", url.pathname);
    console.log("Normalized pathname:", pathname);
    console.log("Should proxy to Vercel:", shouldProxyToVercel);

    if (shouldProxyToVercel) {
      // === PROXY NAAR VERCEL ===
      const vercelUrl = `https://${VERCEL_DOMAIN}${pathname}${url.search}`;

      console.log("Proxying to Vercel:", vercelUrl);

      try {
        const vercelRequest = new Request(vercelUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body,
          redirect: "follow", // Volg redirects van Vercel
        });

        const response = await fetch(vercelRequest);

        console.log("Vercel response status:", response.status);
        console.log("Vercel response headers:", JSON.stringify([...response.headers]));

        // Maak nieuwe response met juiste headers
        const modifiedResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });

        // Voeg debug headers toe
        modifiedResponse.headers.set("X-Proxy-Target", "Vercel");
        modifiedResponse.headers.set("X-Vercel-Domain", VERCEL_DOMAIN);
        modifiedResponse.headers.set("X-Original-Path", url.pathname);
        modifiedResponse.headers.set("X-Normalized-Path", pathname);

        return modifiedResponse;
      } catch (error) {
        console.error("Vercel proxy error:", error);

        // Return error response
        return new Response(`Worker Error: ${error.message}`, {
          status: 500,
          headers: {
            "Content-Type": "text/plain",
            "X-Worker-Error": "true",
          },
        });
      }
    }

    // === DEFAULT: WORDPRESS ===
    console.log("Proxying to WordPress (origin)");

    try {
      const response = await fetch(request);
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      modifiedResponse.headers.set("X-Proxy-Target", "WordPress");

      return modifiedResponse;
    } catch (error) {
      console.error("WordPress proxy error:", error);

      return new Response(`WordPress Proxy Error: ${error.message}`, {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
          "X-Worker-Error": "true",
        },
      });
    }
  },
};
