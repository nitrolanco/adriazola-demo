export interface ContactData {
  message: string;
  email: string;
  phone: string;
}

export type ContactChannel = 'email' | 'whatsapp';

export function buildWhatsAppUrl(number: string, data: ContactData): string {
  const lines = [data.message.trim()];
  if (data.email.trim()) lines.push(`Email de contacto: ${data.email.trim()}`);
  if (data.phone.trim())
    lines.push(`Teléfono de contacto: ${data.phone.trim()}`);
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export interface ContactError {
  field: keyof ContactData;
  message: string;
}

export function validateContact(
  data: ContactData,
  channel: ContactChannel,
): ContactError | null {
  if (!data.message.trim()) {
    return { field: 'message', message: 'Escribe brevemente qué necesitas.' };
  }
  if (channel === 'whatsapp') return null;
  const email = data.email.trim();
  if (!email && !data.phone.trim()) {
    return {
      field: 'email',
      message: 'Indica un email o un teléfono para que podamos responderte.',
    };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { field: 'email', message: 'Revisa el formato de tu email.' };
  }
  return null;
}
