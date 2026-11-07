// Plotline — satire feed fetcher (Netlify Function)
// Fetches a publisher's public RSS feed on the server, following any redirects,
// and serves it from plotline-bryan.netlify.app/feeds/fn/<source>.
// Only the feeds listed here can be fetched.

const FEEDS = {
  "the-daily-mash": ["https://www.thedailymash.co.uk/feed/", "https://thedailymash.co.uk/feed/"],
  "newsthump": ["https://newsthump.com/feed/"]
};

export default async (req, context) => {
  const urls = FEEDS[context.params.source];
  if (!urls) return new Response("Unknown feed", { status: 404 });

  let lastProblem = "no response";
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PlotlineFeedReader/1.0; +https://plotline-bryan.netlify.app)",
          "Accept": "application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8"
        }
      });
      const text = await response.text();
      if (response.ok && /<(rss|feed|rdf:RDF)[\s>]/i.test(text)) {
        return new Response(text, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            // Keep a copy at Netlify's edge for 10 minutes so publishers aren't hit on every visit.
            "Netlify-CDN-Cache-Control": "public, s-maxage=600, stale-while-revalidate=600",
            "Cache-Control": "public, max-age=300"
          }
        });
      }
      lastProblem = `HTTP ${response.status}${response.ok ? " (not RSS)" : ""}`;
    } catch (error) {
      lastProblem = error.message;
    }
  }
  return new Response(`Feed unavailable: ${lastProblem}`, { status: 502 });
};

export const config = { path: "/feeds/fn/:source" };
