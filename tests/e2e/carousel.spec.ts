import { expect, test } from '@playwright/test';

test('los carruseles recorren todas las fotos y vuelven al inicio', async ({
  page,
}) => {
  await page.goto('./');
  for (const [label, total] of [
    ['Instalaciones destacadas', 4],
    ['Galería de trabajos', 12],
  ] as const) {
    const carousel = page.getByRole('region', { name: label });
    const next = carousel.getByRole('button', { name: 'Fotos siguientes' });
    await expect(next).toBeVisible();
    for (let index = 0; index < total; index++) {
      const slide = carousel.locator('figure').nth(index);
      await expect(slide).toBeVisible();
      const photo = slide.locator('img');
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
      await next.click();
    }
    await expect(carousel.locator('[data-position]')).toContainText(
      /^1 (de|y)/,
    );
    await carousel.getByRole('button', { name: 'Fotos anteriores' }).click();
    await expect(carousel.locator('figure').last()).toBeVisible();
    await carousel.locator('.carousel-track').focus();
    await page.keyboard.press('ArrowRight');
    await expect(carousel.locator('[data-position]')).toContainText(
      /^1 (de|y)/,
    );
  }
});

test('galería compacta, arrastre manual y textos sin avisos de revisión', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.locator('.carousel-ready')).toHaveCount(2);
  const hero = page.locator('.carousel-hero');
  const work = page.locator('.carousel-work');
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(work.locator('figure:visible')).toHaveCount(1);
    await expect(hero.locator('figure:visible')).toHaveCount(1);
    const introBounds = (await page.locator('.hero > div').boundingBox())!;
    const galleryBounds = (await hero.boundingBox())!;
    expect(galleryBounds.y).toBeGreaterThanOrEqual(
      introBounds.y + introBounds.height,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const track = hero.locator('.carousel-track');
  await track.scrollIntoViewIfNeeded();
  const bounds = (await track.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * 0.8, bounds.y + 80);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.2, bounds.y + 80);
  await page.mouse.up();
  await expect(hero.locator('[data-position]')).toHaveText('2 de 4');
  await expect(work.locator('[data-position]')).toHaveText('1 de 12');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(
    /provisional|provisorio|versión de revisión|en desarrollo/i,
  );
  await expect(
    page.getByRole('heading', { name: 'Nuestros servicios', exact: true }),
  ).toBeVisible();
});

test('visor accesible sin navegación y respeto por movimiento reducido', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const hero = page.locator('.carousel-hero');
  await expect(
    hero.getByRole('button', { name: 'Reproducir', exact: true }),
  ).toBeVisible();
  const expand = hero.locator('figure:visible .photo-expand');
  const url = page.url();
  await expand.click();
  const viewer = page.getByRole('dialog', { name: 'Fotografía ampliada' });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator('img')).toHaveAttribute('src', /solar2.jpeg$/);
  await expect(viewer.getByRole('button', { name: 'Cerrar ×' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(viewer).toBeHidden();
  await expect(expand).toBeFocused();
  expect(page.url()).toBe(url);
  await expand.press('Enter');
  await viewer.getByRole('button', { name: 'Cerrar ×' }).click();
  await expect(viewer).toBeHidden();
});

test('reproducción lenta con pausa explícita', async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./');
  const hero = page.locator('.carousel-hero');
  await hero.scrollIntoViewIfNeeded();
  await expect(
    hero.getByRole('button', { name: 'Pausar', exact: true }),
  ).toBeVisible();
  await page.mouse.move(0, 0);
  await page.clock.runFor(7100);
  await expect(hero.locator('[data-position]')).toHaveText('2 de 4');
  await hero.getByRole('button', { name: 'Pausar', exact: true }).click();
  await page.clock.runFor(15000);
  await expect(hero.locator('[data-position]')).toHaveText('2 de 4');
});

test('sin JavaScript las fotos siguen disponibles con desplazamiento horizontal', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(test.info().project.use.baseURL!);
  await expect(page.locator('main figure')).toHaveCount(16);
  await expect(page.locator('figure[hidden]')).toHaveCount(0);
  await expect(page.locator('.carousel-controls:visible')).toHaveCount(0);
  await context.close();
});
