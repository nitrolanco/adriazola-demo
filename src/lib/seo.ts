import { site } from '../config/site';

export function isOfficialIndexable(
  enabled: string | undefined,
  siteUrl: string | undefined,
  base: string,
): boolean {
  return enabled === 'true' && siteUrl === site.url && base === '/';
}
