import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('correo envía solo teléfono y bloquea envíos duplicados mientras espera', async ({
  page,
}) => {
  let release: () => void = () => {};
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  let submissions = 0;
  await page.context().route('https://formspree.io/**', async (route) => {
    submissions += 1;
    expect(route.request().postDataJSON()).toEqual({
      message: 'Consulta de prueba',
      phone: '+56 9 1234 5678',
    });
    await pending;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"ok":true}',
    });
  });
  await page
    .getByLabel('Tu consulta', { exact: true })
    .fill('Consulta de prueba');
  await page.getByText('Prefiero enviar por correo', { exact: true }).click();
  await page
    .getByLabel('Teléfono (opcional si indicas email)', { exact: true })
    .fill('+56 9 1234 5678');
  const submit = page.getByRole('button', {
    name: 'Enviar consulta por correo',
  });
  await submit.click();
  try {
    await expect(submit).toBeDisabled();
    await expect(page.getByRole('form')).toHaveAttribute('aria-busy', 'true');
    await expect(page.getByRole('form').getByRole('status')).toContainText(
      'Enviando',
    );
  } finally {
    release();
  }
  await expect(page.getByRole('form').getByRole('status')).toContainText(
    'Consulta recibida',
  );
  await expect(submit).toBeEnabled();
  expect(submissions).toBe(1);
});

test.beforeEach(async ({ page }) => {
  await page.context().route('https://wa.me/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>WhatsApp interceptado para pruebas</title>',
    }),
  );
  await page.context().route('https://formspree.io/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"ok":true}',
    }),
  );
  await page.goto('./');
  await page.locator('#contact-form').evaluate((form) => {
    (form as HTMLFormElement).dataset.formId = 'testform';
  });
  await page.getByRole('link', { name: 'Contacto', exact: true }).click();
  await expect(page).toHaveURL(/#contacto$/);
});

test('correo requiere email o teléfono y conserva la consulta', async ({
  page,
}) => {
  const form = page.getByRole('form', { name: 'Prepara tu consulta' });
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
  await expect(form.getByRole('status')).toContainText(
    'Consulta recibida por el servicio',
  );
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
  await expect(status).toContainText('Consulta recibida por el servicio');
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
  expect(url.pathname).toBe('/56979881579');
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

test('correo no configurado no afirma que se haya enviado', async ({
  page,
}) => {
  await page.locator('#contact-form').evaluate((form) => {
    (form as HTMLFormElement).dataset.formId = '';
  });
  await page
    .getByLabel('Tu consulta', { exact: true })
    .fill('Consulta de prueba');
  await page.getByText('Prefiero enviar por correo', { exact: true }).click();
  await page
    .getByLabel('Teléfono (opcional si indicas email)', { exact: true })
    .fill('+56 9 1234 5678');
  await page
    .getByRole('button', { name: 'Enviar consulta por correo' })
    .click();
  await expect(page.getByRole('form').getByRole('status')).toContainText(
    'no se ha enviado ningún dato',
  );
});

test('un fallo de correo conserva la consulta y permite usar WhatsApp', async ({
  page,
}) => {
  await page
    .context()
    .route('https://formspree.io/**', (route) =>
      route.fulfill({ status: 429, body: '{}' }),
    );
  await page
    .getByLabel('Tu consulta', { exact: true })
    .fill('Consulta de prueba');
  await page.getByText('Prefiero enviar por correo', { exact: true }).click();
  await page
    .getByLabel('Email (opcional si indicas teléfono)', { exact: true })
    .fill('persona@example.com');
  await page
    .getByRole('button', { name: 'Enviar consulta por correo' })
    .click();
  await expect(page.getByRole('form').getByRole('status')).toContainText(
    'límite de envíos',
  );
  await expect(page.getByLabel('Tu consulta', { exact: true })).toHaveValue(
    'Consulta de prueba',
  );
  await expect(
    page.getByRole('button', { name: 'Continuar en WhatsApp' }),
  ).toBeEnabled();
  await expect(
    page.getByRole('link', { name: 'Hablar por WhatsApp' }),
  ).toHaveAttribute('href', /^https:\/\/wa.me\/56979881579/);
});
