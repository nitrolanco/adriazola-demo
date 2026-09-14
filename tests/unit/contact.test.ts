import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, validateContact } from '../../src/lib/contact';

describe('validación de la consulta', () => {
  const message = 'Necesito revisar la instalación de mi local en Aysén.';

  it.each(['email', 'whatsapp'] as const)(
    'exige consulta para %s',
    (channel) => {
      expect(
        validateContact({ message: '  ', email: '', phone: '' }, channel)
          ?.field,
      ).toBe('message');
    },
  );

  it('exige algún contacto para correo, ignorando espacios', () => {
    expect(
      validateContact({ message, email: ' ', phone: ' ' }, 'email')?.field,
    ).toBe('email');
  });

  it.each([
    { email: 'persona@example.com', phone: '' },
    { email: '', phone: '+56 9 1234 5678' },
    { email: 'persona@example.com', phone: '+56 9 1234 5678' },
  ])('acepta correo con contacto suficiente: %o', (contact) => {
    expect(validateContact({ message, ...contact }, 'email')).toBeNull();
  });

  it('no exige contactos para WhatsApp', () => {
    expect(
      validateContact({ message, email: '', phone: '' }, 'whatsapp'),
    ).toBeNull();
  });

  it('un email inválido no bloquea el cambio a WhatsApp', () => {
    expect(
      validateContact({ message, email: 'incorrecto', phone: '' }, 'whatsapp'),
    ).toBeNull();
  });

  it.each(['incorrecto', 'persona@', 'persona @example.com'])(
    'rechaza email inválido aportado: %s',
    (email) => {
      expect(
        validateContact({ message, email, phone: '+56 9 1234 5678' }, 'email')
          ?.field,
      ).toBe('email');
    },
  );

  it('acepta espacios alrededor del email', () => {
    expect(
      validateContact(
        { message, email: ' persona@example.com ', phone: '' },
        'email',
      ),
    ).toBeNull();
  });
});

describe('enlace de WhatsApp', () => {
  it('codifica la consulta completa sin crear parámetros adicionales', () => {
    const message =
      'Instalación en Aysén & revisión + materiales?\nSegunda línea #1';
    const url = new URL(
      buildWhatsAppUrl('56912345678', { message, email: '', phone: '' }),
    );
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/56912345678');
    expect(url.searchParams.get('text')).toBe(message);
    expect([...url.searchParams.keys()]).toEqual(['text']);
    expect(url.hash).toBe('');
  });

  it('incluye los contactos opcionales aportados y elimina espacios exteriores', () => {
    const url = new URL(
      buildWhatsAppUrl('56912345678', {
        message: ' Consulta ',
        email: ' persona@example.com ',
        phone: ' +56 9 1234 5678 ',
      }),
    );
    expect(url.searchParams.get('text')).toBe(
      'Consulta\nEmail de contacto: persona@example.com\nTeléfono de contacto: +56 9 1234 5678',
    );
  });

  it('omite los contactos vacíos', () => {
    const url = new URL(
      buildWhatsAppUrl('56912345678', {
        message: 'Consulta',
        email: ' ',
        phone: ' ',
      }),
    );
    expect(url.searchParams.get('text')).toBe('Consulta');
  });
});
