import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendContactEmail } from '../../src/lib/email';

afterEach(() => vi.unstubAllGlobals());

describe('envío por correo', () => {
  const data = {
    message: ' Consulta en Aysén ',
    email: '',
    phone: ' +56 9 1234 5678 ',
  };

  it('no envía si falta configuración', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactEmail(false, data)).rejects.toThrow(
      'no está disponible',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('no envía si falta un contacto', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(
      sendContactEmail(true, { ...data, phone: '' }),
    ).rejects.toThrow('email o un teléfono');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('envía teléfono sin inventar un email ni destinatario', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await sendContactEmail(true, data);
    expect(fetchMock).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'error',
        body: new URLSearchParams({
          'form-name': 'adriazola-contacto',
          'bot-field': '',
          message: 'Consulta en Aysén',
          phone: '+56 9 1234 5678',
        }).toString(),
      }),
    );
  });

  it.each([400, 403, 404, 405, 500])(
    'no anuncia éxito ante HTTP %s',
    async (status) => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('{}', { status })),
      );
      await expect(sendContactEmail(true, data)).rejects.toThrow('no aceptó');
    },
  );

  it('explica un límite de envíos', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{}', { status: 429 })),
    );
    await expect(sendContactEmail(true, data)).rejects.toThrow('límite');
  });

  it('no reintenta automáticamente una conexión incierta', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactEmail(true, data)).rejects.toThrow(
      'confirmar la recepción',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('codifica caracteres especiales y transmite el honeypot sin alterar campos', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await sendContactEmail(
      true,
      {
        message: ' Revisión & fuerza + control = Aysén ',
        email: ' persona@example.com ',
        phone: '',
      },
      'bot',
    );
    const payload = new URLSearchParams(fetchMock.mock.calls[0][1].body);
    expect(Object.fromEntries(payload)).toEqual({
      'form-name': 'adriazola-contacto',
      'bot-field': 'bot',
      message: 'Revisión & fuerza + control = Aysén',
      email: 'persona@example.com',
    });
  });
});
