import { validateContact, type ContactData } from './contact';

export async function sendContactEmail(
  formId: string,
  data: ContactData,
): Promise<void> {
  if (!/^[a-z0-9]+$/i.test(formId)) {
    throw new Error(
      'El correo no está disponible. Puedes contactarnos por WhatsApp o teléfono; no se ha enviado ningún dato.',
    );
  }
  const validation = validateContact(data, 'email');
  if (validation) throw new Error(validation.message);
  const body = {
    message: data.message.trim(),
    ...(data.email.trim() ? { email: data.email.trim() } : {}),
    ...(data.phone.trim() ? { phone: data.phone.trim() } : {}),
  };
  let response: Response;
  try {
    response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
