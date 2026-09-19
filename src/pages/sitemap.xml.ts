import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { isOfficialIndexable } from '../lib/seo';

export const GET: APIRoute = ({ site: buildSite }) => {
  const indexable = isOfficialIndexable(
    import.meta.env.PUBLIC_SITE_INDEXABLE,
    buildSite?.href,
    import.meta.env.BASE_URL,
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexable ? `<url><loc>${site.url}</loc></url>` : ''}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
