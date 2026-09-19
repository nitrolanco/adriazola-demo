import { validateContact, type ContactData } from './contact';

export const contactFormName = 'adriazola-contacto';

export async function sendContactEmail(
  enabled: boolean,
  data: ContactData,
  botField = '',
): Promise<void> {
  if (!enabled) {
    throw new Error(
      'El correo no está disponible. Puedes contactarnos por WhatsApp o teléfono; no se ha enviado ningún dato.',
    );
  }
  const validation = validateContact(data, 'email');
  if (validation) throw new Error(validation.message);
  const body = new URLSearchParams({
    'form-name': contactFormName,
    'bot-field': botField,
    message: data.message.trim(),
    ...(data.email.trim() ? { email: data.email.trim() } : {}),
    ...(data.phone.trim() ? { phone: data.phone.trim() } : {}),
  });
  let response: Response;
  try {
    response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
      credentials: 'omit',
    });
  } catch {
    throw new Error(
      'No pudimos confirmar la recepción. Tu consulta sigue aquí; puedes intentarlo más tarde o contactarnos por WhatsApp.',
    );
  }
  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? 'El servicio alcanzó su límite de envíos. Tu consulta sigue aquí; contáctanos por WhatsApp o teléfono.'
        : 'El servicio no aceptó el envío. Tu consulta sigue aquí; intenta más tarde o contáctanos por WhatsApp.',
    );
  }
}
