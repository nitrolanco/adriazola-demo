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
    await expect(sendContactEmail('', data)).rejects.toThrow(
      'no está disponible',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('no envía si falta un contacto', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(
      sendContactEmail('testform', { ...data, phone: '' }),
    ).rejects.toThrow('email o un teléfono');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('envía teléfono sin inventar un email ni destinatario', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await sendContactEmail('testform', data);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://formspree.io/f/testform',
      expect.objectContaining({
        method: 'POST',
        credentials: 'omit',
        body: JSON.stringify({
          message: 'Consulta en Aysén',
          phone: '+56 9 1234 5678',
        }),
      }),
    );
  });

  it.each([400, 403, 500])('no anuncia éxito ante HTTP %s', async (status) => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{}', { status })),
    );
    await expect(sendContactEmail('testform', data)).rejects.toThrow(
      'no aceptó',
    );
  });

  it('explica un límite de envíos', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{}', { status: 429 })),
    );
    await expect(sendContactEmail('testform', data)).rejects.toThrow('límite');
  });

  it('no reintenta automáticamente una conexión incierta', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactEmail('testform', data)).rejects.toThrow(
      'confirmar la recepción',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
