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
    `User-agent: *\nAllow: /\n${indexable ? `Sitemap: ${site.url}sitemap.xml\n` : ''}`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
