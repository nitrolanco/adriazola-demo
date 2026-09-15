import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.context().route('https://wa.me/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>WhatsApp interceptado para pruebas</title>',
    }),
  );
  await page.goto('./');
  await page.getByRole('link', { name: 'Contacto', exact: true }).click();
  await expect(page).toHaveURL(/#contacto$/);
});

test('correo requiere email o teléfono y conserva la consulta', async ({
  page,
}) => {
  const form = page.getByRole('form', { name: 'Cuéntanos qué necesitas.' });
  await page
    .getByLabel('Tu consulta', { exact: true })
    .fill('Necesito mantenimiento en Aysén.');
  await page.getByText('Prefiero enviar por correo', { exact: true }).click();
  await page
    .getByRole('button', { name: 'Enviar consulta por correo' })
    .click();
  await expect(form.getByRole('status')).toHaveText(
    'Indica un email o un teléfono para que podamos responderte.',
  );
  await expect(
    page.getByLabel('Email (opcional si indicas teléfono)', { exact: true }),
  ).toBeFocused();
  await page
    .getByLabel('Teléfono (opcional si indicas email)', { exact: true })
    .fill('+56 9 1234 5678');
  await page
    .getByRole('button', { name: 'Enviar consulta por correo' })
    .click();
  await expect(form.getByRole('status')).toContainText('Consulta validada.');
  await expect(page.getByLabel('Tu consulta', { exact: true })).toHaveValue(
    'Necesito mantenimiento en Aysén.',
  );
});

test('email inválido se corrige y WhatsApp no exige contactos', async ({
  page,
}) => {
  const status = page.getByRole('form').getByRole('status');
  await page
    .getByLabel('Tu consulta', { exact: true })
    .fill('Consulta de instalación.');
  await page.getByRole('button', { name: 'Continuar en WhatsApp' }).click();
  await expect(status).toContainText('Se solicitó abrir WhatsApp.');
  await page.getByText('Prefiero enviar por correo', { exact: true }).click();
  const email = page.getByLabel('Email (opcional si indicas teléfono)', {
    exact: true,
  });
  await email.fill('incorrecto');
  await page
    .getByRole('button', { name: 'Enviar consulta por correo' })
    .click();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(status).toHaveText('Revisa el formato de tu email.');
  await email.fill('persona@example.com');
  await page
    .getByRole('button', { name: 'Enviar consulta por correo' })
    .click();
  await expect(status).toContainText('Consulta validada.');
});

test('WhatsApp prepara el chat y conserva la consulta sin contactar el servicio real', async ({
  page,
}) => {
  const query = 'Instalación en Aysén & revisión + materiales';
  await page.getByLabel('Tu consulta', { exact: true }).fill(query);
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Continuar en WhatsApp' }).click();
  const popup = await popupPromise;
  await popup.waitForURL('https://wa.me/**');
  const url = new URL(popup.url());
  expect(url.pathname).toBe('/56921857885');
  expect(url.searchParams.get('text')).toBe(query);
  await expect(page.getByLabel('Tu consulta', { exact: true })).toHaveValue(
    query,
  );
  await expect(
    page.getByRole('link', {
      name: 'Si WhatsApp no se abrió, abre tu consulta aquí',
    }),
  ).toHaveAttribute('href', popup.url());
  await popup.close();
});

test('consulta vacía muestra error accesible y no envía solicitudes', async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') submissions.push(request.url());
  });
  await page.getByRole('button', { name: 'Continuar en WhatsApp' }).click();
  await expect(page.getByLabel('Tu consulta', { exact: true })).toBeFocused();
  await expect(page.getByRole('form').getByRole('status')).toHaveText(
    'Escribe brevemente qué necesitas.',
  );
  await page.getByText('Prefiero enviar por correo', { exact: true }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(submissions).toEqual([]);
});
