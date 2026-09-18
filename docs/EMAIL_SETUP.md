# Activación del correo

## Estado

Integración preparada para Formspree, sin SDK, servidor propio ni credenciales
privadas en el navegador. El usuario proporcionó el formulario `xnpnnwrp`,
configurado en `.env` local. Falta confirmar el destinatario verificado y probar
recepción real; la variable de GitHub todavía debe configurarse.
Sin `PUBLIC_FORMSPREE_FORM_ID`, la página avisa que el correo no está activo
y nunca presenta éxito ni envía datos. WhatsApp y llamadas siguen disponibles.

## Configurar

1. Crear un formulario en Formspree, con notificaciones a `reddataspa@gmail.com`,
   y completar la verificación que solicite. No basta con cambiar el email en
   `src/config/site.ts`: el destinatario efectivo se configura en Formspree.
2. Obtener el identificador público de `https://formspree.io/f/IDENTIFICADOR`.
3. Copiar `.env.example` a `.env` y completar `PUBLIC_FORMSPREE_FORM_ID` con solo
   ese identificador. Reiniciar desarrollo. No introducir tokens de cuenta.
4. En GitHub → Settings → Secrets and variables → Actions → Variables, crear
   una variable de repositorio con el mismo nombre y valor. El workflow la pasa
   al build. Una modificación requiere reconstruir y desplegar; no es dinámica.
5. Configurar protección antispam y dominios permitidos en el proveedor según las
   opciones del plan. No hacer obligatorio el email si se acepta solo teléfono.
   La validación del navegador no sustituye validación y protección del servicio.
6. Revisar límites y tratamiento/retención de datos del proveedor antes de activar
   públicamente. El aviso del formulario informa que se procesa vía Formspree.

## Aceptación antes de darlo por operativo

- Enviar una consulta autorizada con email y otra solo con teléfono.
- Verificar ambas en Formspree y en la bandeja del destinatario, incluyendo spam.
- Si el proveedor exige CAPTCHA, completar su integración antes de publicar;
  no desactivar controles por defecto para ocultar un error de envío.
- Confirmar errores de red, rechazo y límite de envíos sin perder el texto.
- La interfaz confirma aceptación del servicio, no entrega garantizada al buzón.
- Para migrar al cliente, cambiar/verificar el destinatario en Formspree y
  actualizar la referencia `emailRecipient`; repetir la comprobación real.

## Pruebas

Vitest simula fetch. Los E2E inyectan un ID de prueba en el atributo público del
formulario e interceptan todas las solicitudes a Formspree y WhatsApp. Nunca
validan recepción real ni consumen envíos del proveedor. No publicar un ID ficticio
para hacer pasar la activación; las pruebas no requieren esa configuración.

## Referencias

- [Formspree y JavaScript](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax)
- [Campos especiales](https://help.formspree.io/articles/building-your-form/special-fields)
