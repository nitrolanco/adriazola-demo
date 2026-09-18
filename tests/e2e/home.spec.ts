import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('la home carga y se puede recargar sin errores', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('requestfailed', (request) => errors.push(request.url()));
  page.on('response', (response) => {
    if (response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto('./');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(
    'Adriazola Electricidad | Servicios eléctricos en Aysén',
  );
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const logo = page.getByRole('img', { name: 'Adriazola', exact: true });
  await expect(logo).toBeVisible();
  await expect
    .poll(() =>
      logo.evaluate((element) => (element as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(
    page.getByRole('link', { name: 'Llamar al +56 9 8816 6792', exact: true }),
  ).toHaveAttribute('href', 'tel:+56988166792');
  await expect(
    page.getByRole('link', { name: 'Consultar por WhatsApp' }),
  ).toHaveAttribute('href', /^https:\/\/wa\.me\/56979881579\?text=/);
  await expect(page.locator('main figure img')).toHaveCount(16);
  await expect(page.locator('.carousel-ready')).toHaveCount(2);
  const photos = page.locator('main figure:visible img');
  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        photo.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }

  const reload = await page.reload();
  expect(reload?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test('la home no presenta infracciones axe detectables', async ({ page }) => {
  await page.goto('./');
  const results = await new AxeBuilder({ page })
    .withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'best-practice',
    ])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('los servicios informáticos quedan al final y los enlaces principales son fáciles de pulsar', async ({
  page,
}) => {
  await page.goto('./');
  const services = page.locator('#servicios article');
  await expect(services).toHaveCount(6);
  await expect(services.last().getByRole('heading', { level: 3 })).toHaveText(
    'Servicios informáticos',
  );
  await expect(services.last()).toContainText(
    'Servicio complementario a través de un colaborador.',
  );
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of [
      'Servicios',
      'Contacto',
      'Consultar por WhatsApp',
      'Ver servicios ↓',
    ]) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toBeVisible();
      const bounds = await link.boundingBox();
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
      expect(bounds?.width).toBeGreaterThanOrEqual(44);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test('el contenido cabe en el viewport, incluso a 320 px', async ({ page }) => {
  await page.goto('./');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 320, height: 740 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
