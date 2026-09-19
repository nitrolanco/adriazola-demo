# Preparación del primer lanzamiento oficial

Revisión inicial: 2026-09-18. No autoriza publicación ni cambios de DNS.
Los cambios visuales recientes siguen locales. Esta lista distingue hallazgos
del código de verificaciones pendientes en servicios externos.

## Bloqueantes antes de publicar

- [x] Recibir dominio definitivo, correo receptor y confirmar ambos teléfonos.
      Dominio: adriazolaelectricidad.cl en NIC.cl. Correo público:
      adriazolaelectricidad@gmail.com, con copia temporal del formulario a
      reddataspa@gmail.com. Netlify y sus formularios quedan en la cuenta del usuario.
- [ ] Configurar y verificar el destinatario real en Netlify Forms. Cambiar
      `emailRecipient` en el código NO cambia el buzón receptor del proveedor.
      Seguir las pruebas reales de `EMAIL_SETUP.md`, con autorización del usuario.
- [ ] Separar indexación de producción y demo: `BaseLayout.astro` actualmente
      contiene `noindex, nofollow` incondicional. Mantener noindex en previews y
      demo; habilitar indexación únicamente en el sitio oficial confirmado.
- [ ] Excluir `public/propuesta` del artefacto por un mecanismo compartido de
      build. Hoy solo lo elimina el workflow de GitHub Pages; Netlify copiaría
      ese prototipo. No borrar el material original para solucionar el despliegue.
- [ ] Preparar Netlify: Node fijado, npm, build estático, publicación de `dist`,
      `SITE_BASE_PATH=/`, `SITE_URL` oficial y `PUBLIC_NETLIFY_FORMS=true`.
- [ ] Ejecutar validación completa con configuración equivalente a producción.
      No publicar con pruebas fallidas ni usar resultados de una versión anterior.

## SEO básico, sin plugins ni contenido inventado

Estado actualizado: idioma español, título, descripción, favicon y contenido
estático existen. Canonical, metadatos para compartir, sitemap y robots.txt están
preparados en código; falta validar artefacto oficial y activar indexación.

Configuración de Netlify y exclusión del prototipo preparadas: ver
`NETLIFY_RELEASE.md`. Los puntos siguientes siguen abiertos hasta comprobarlos
en un build y despliegue reales, no solo por existir en el repositorio.

- [ ] Canonical absoluto del dominio oficial, consistente con HTTPS y www/sin www.
- [ ] Open Graph con título, descripción e imagen aprobada; comprobar que los
      recursos compartidos tienen URLs absolutas accesibles.
- [ ] Sitemap mínimo de URLs oficiales indexables y referencia desde robots.txt.
      No bloquear el rastreo de demos con robots si se necesita que lean noindex.
- [ ] Confirmar el nombre comercial y cobertura en Aysén. Datos estructurados
      solo con hechos verificados; no inventar dirección, horarios o reseñas.
      No son una condición para publicar esta landing.
- [ ] Mantener la demo fuera del índice y acordar si se conserva o se redirige.
- [ ] Tras lanzamiento: verificar Search Console y enviar sitemap. No garantiza
      indexación inmediata ni posiciones en los resultados.

## Seguridad y resistencia básica

Estado: sitio estático sin backend propio, login ni base de datos. La consulta
se codifica para WhatsApp y los mensajes de estado se insertan con textContent.
Se bloquea doble envío mientras espera, hay timeout de 15 segundos, manejo de
rechazos/429 y no hay reintentos automáticos. .env está ignorado por Git.

- [ ] Añadir longitudes máximas razonables a consulta, email y teléfono, con
      validación compartida y pruebas. Son controles de uso, no rate limiting.
- [ ] Revisar antispam y cuotas de Netlify Forms según el plan. El honeypot
      no sustituye los controles del servicio ni constituye autenticación.
- [ ] Cabeceras del hosting: nosniff, protección contra enmarcado, política de
      referencias compatible con el sitio y permisos de cámara/micrófono/ubicación
      deshabilitados. Evaluar CSP sobre el build real sin romper scripts de Astro
      ni introducir unsafe-inline solo para silenciar errores.
- [ ] Verificar dependencias con auditoría del registro y priorizar riesgos
      aplicables; no ejecutar actualizaciones forzadas ni cambiar todo el stack.
- [ ] Revisar artefacto final: sin secretos, fuentes sincronizadas ni prototipos.
- [ ] Confirmar cuotas y alertas del hosting. No prometer inmunidad a DDoS ni
      protección contra agotamiento de créditos con controles de frontend.
      No añadir servidor, proxy o CAPTCHA por defecto ni hacer pruebas de carga
      contra Netlify. Simular errores y abuso en pruebas locales.

## Usabilidad, privacidad y rendimiento

- [ ] Pruebas de formulario: vacío, espacios, texto largo, contactos inválidos,
      doble clic, red caída, timeout, 429 y recuperación sin perder la consulta.
- [ ] Revisar 320 px, móvil real y escritorio: teclado, foco del visor, Escape,
      zoom, deslizamiento, pausa del carrusel y movimiento reducido; ejecutar axe.
- [ ] Medir carga, estabilidad visual y peso transferido con Lighthouse; los
      archivos de public/images suman aproximadamente 1,28 MB, no necesariamente
      descargados todos al inicio. No confundir peso en disco con coste de carga.
- [ ] Evitar nuevas librerías, fuentes remotas y analítica en esta primera versión.
- [ ] Añadir un aviso breve y comprensible sobre los datos solicitados, finalidad,
      responsable y canal de contacto, sujeto a confirmación del cliente. No
      presentar un texto generado como certificación de cumplimiento legal.
- [ ] Confirmar autorización de publicación de fotografías y datos de contacto.
- [ ] Página 404 útil, enlaces reales y ausencia de recursos rotos.

## Publicación agrupada y reversión

1. Completar configuración y revisión local antes de conectar producción.
2. Mantener commits de trabajo; reducir publicaciones, no respaldos en Git.
3. Revisar una preview sin indexación. Evitar conectar cada push de la rama de
   trabajo a producción; reservar una rama de publicación o publicar manualmente.
4. Confirmar plan real en Netlify. En planes por créditos documentados a esta
   fecha, Free incluye 300 créditos/mes y cada deploy de producción exitoso
   consume 15; tráfico y otros usos también consumen. No equivale a cinco pushes.
5. Configurar dominio/HTTPS y redirección al dominio principal. Si se cambian
   nameservers, conservar registros MX, SPF, DKIM, DMARC y verificaciones existentes
   para no interrumpir el correo del cliente. No compartir claves en el chat.
6. Publicar un lote aprobado; verificar HTTPS, headers, robots, canonical, fotos,
   contactos y recepción de correo. Guardar versión/commit y despliegue de retorno.

## Fuentes oficiales

- [Créditos Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)
- [Planes Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)
- [Cabeceras Netlify](https://docs.netlify.com/manage/routing/headers/)
- [Antispam Netlify](https://docs.netlify.com/manage/forms/spam-filters/)
- [Uso de Netlify Forms](https://docs.netlify.com/manage/forms/usage-and-billing/)
- [SEO Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
