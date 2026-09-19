import { describe, expect, it } from 'vitest';
import { isOfficialIndexable } from '../../src/lib/seo';

describe('indexación del sitio oficial', () => {
  it('exige autorización, URL oficial y raíz', () => {
    expect(
      isOfficialIndexable('true', 'https://adriazolaelectricidad.cl/', '/'),
    ).toBe(true);
  });

  it.each([
    [undefined, 'https://adriazolaelectricidad.cl/', '/'],
    ['false', 'https://adriazolaelectricidad.cl/', '/'],
    ['true', undefined, '/'],
    ['true', 'https://nitrolanco.github.io/', '/adriazola-demo/'],
    ['true', 'https://demo.netlify.app/', '/'],
    ['true', 'https://adriazolaelectricidad.cl/', '/adriazola-demo/'],
  ])('no indexa configuración no oficial %j', (enabled, url, base) => {
    expect(isOfficialIndexable(enabled, url, base!)).toBe(false);
  });
});
