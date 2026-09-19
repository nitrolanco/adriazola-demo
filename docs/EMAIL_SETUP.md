# Correo con Netlify Forms

## Estado

Se reemplaza Formspree por Netlify Forms, sin SDK ni servidor propio.
Formulario: `adriazola-contacto`. Destinos aprobados:
`adriazolaelectricidad@gmail.com` y copia temporal a `reddataspa@gmail.com`.
Las notificaciones NO se configuran en el navegador: falta activarlas en Netlify.
El mailto público abre el correo del cliente y no incorpora automáticamente copia.

## Activación en Netlify

1. En el proyecto, abrir Forms y activar **Enable form detection** antes del
   despliegue que incluye el formulario. Netlify necesita analizar el HTML final.
2. Desplegar con `npm run build:netlify`. El HTML contiene name, method POST,
   data-netlify, form-name y el honeypot bot-field, además de los campos visibles.
3. Confirmar que Forms muestra `adriazola-contacto`.
4. En Forms → Submission notifications, añadir una notificación de email para
   cada destinatario, limitada a este formulario. Completar verificaciones si
   el panel las solicita. No poner emails receptores en campos ocultos.
5. Enviar, con autorización, una consulta con email y otra solo con teléfono.
   Comprobar que cada una aparece una sola vez en Forms y llega a ambas bandejas,
   incluyendo spam. Un HTTP exitoso no garantiza entrega a los buzones.
6. Revisar filtros antispam y cuotas del plan. El honeypot es un filtro básico,
   no autenticación ni protección DDoS. No se añade CAPTCHA inicialmente.

## Local, demo y pruebas

`PUBLIC_NETLIFY_FORMS=true` se configura en netlify.toml. Sin esa variable,
el cliente no hace solicitudes de correo ni anuncia éxito; WhatsApp, llamadas
y mailto siguen disponibles. GitHub Pages fuerza false: no ofrece Netlify Forms.
Astro preview tampoco implementa el servicio; habilitar la variable localmente
no lo convierte en un receptor de correo.

La petición usa POST al mismo origen, en `/`, codificada como
application/x-www-form-urlencoded. Incluye form-name y bot-field. Conserva
timeout, bloqueo de doble clic, errores 429/red y texto de la consulta.
El endpoint requiere el sitio servido por Netlify en raíz, como configura el proyecto.

Vitest simula fetch. Playwright intercepta los POST locales y WhatsApp, activando
solo en el DOM la bandera de prueba. No hay envíos a buzones reales ni cuotas consumidas.
Sin JavaScript quedan disponibles los enlaces directos; los botones del formulario
permanecen desactivados para evitar eludir la validación email-o-teléfono.

## Retirada de Formspree

El código ya no utiliza `PUBLIC_FORMSPREE_FORM_ID`. Se puede eliminar esa variable
de .env, GitHub y Netlify; el valor antiguo es inocuo y se ignora.
No cerrar el formulario anterior hasta validar la migración y decidir qué hacer
con las consultas históricas. No se borraron datos ni se modificó la cuenta externa.

## Referencias

Validación de la migración (2026-09-18): lint, formato y Astro check pasan
(23 archivos). Vitest y build:netlify se bloquean por spawn EPERM del entorno;
las pruebas actualizadas aún requieren ejecución externa. Sin envío real,
publicación ni configuración remota de notificaciones durante esta migración.

- [Detección y envío AJAX](https://docs.netlify.com/manage/forms/setup/)
- [Notificaciones](https://docs.netlify.com/manage/forms/notifications/)
- [Antispam](https://docs.netlify.com/manage/forms/spam-filters/)
- [Uso y facturación](https://docs.netlify.com/manage/forms/usage-and-billing/)
