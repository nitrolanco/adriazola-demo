# Lanzamiento oficial en Netlify

Destino confirmado: `https://adriazolaelectricidad.cl/`, registrado en NIC.cl.
Netlify y sus formularios quedan en la cuenta del usuario. Sin cambios DNS ejecutados.

## Preparado en el repositorio

- `netlify.toml`: Node 24.19.0, sitio estático y publicación de `dist`.
- `build:netlify`: build y exclusión del prototipo únicamente del artefacto.
  El material de `public/propuesta` no se elimina del repositorio.
- Cabeceras de contenido, enmarcado, referencias y permisos del navegador.
- Correo público del cliente; notificaciones dobles pendientes en Netlify Forms.
- SEO oficial condicionado: canonical, metadatos para compartir y sitemap
  solo cuando `PUBLIC_SITE_INDEXABLE=true`, URL oficial y base `/`.
  Sin esa autorización, la home conserva noindex. Previews y branch deploys
  fuerzan la variable a false. No aplicar un bloqueo robots que impida leer noindex.

## Antes de conectar producción

1. Ejecutar `npm run validate` y `npm run build:netlify` con Node compatible.
   Comprobar ausencia de `dist/propuesta` y la home en la raíz del artefacto.
2. Activar detección de formularios antes del deploy y configurar las dos
   notificaciones siguiendo `EMAIL_SETUP.md`. `PUBLIC_NETLIFY_FORMS=true` ya está
   definido en netlify.toml; no requiere claves privadas.
3. Mantener `PUBLIC_SITE_INDEXABLE=false` durante revisión. Solo al aprobar el
   dominio y contenido final, cambiar a true en contexto producción y reconstruir.
4. Elegir explícitamente la rama de publicación antes de conectar Git. No conectar
   la rama de trabajo a producción si se quiere evitar deploys por cada push.
5. Elegir el dominio sin www como principal y añadir www como alias. Obtener los
   registros de Netlify antes de modificar NIC/DNS; no usar direcciones IP supuestas.
6. Registrar los DNS actuales, incluidos MX/TXT, y preservar el correo. Configurar
   HTTPS y comprobar redirección de alias y URL netlify.app al dominio principal.

## Comprobación del lanzamiento

- Ejecutar pruebas con `SITE_URL=https://adriazolaelectricidad.cl/`,
  `SITE_BASE_PATH=/` y `PUBLIC_SITE_INDEXABLE=true` antes de publicar.
- Revisar robots, canonical, sitemap, enlaces e imagen social en el artefacto.
- Verificar cabeceras HTTP reales en Netlify; Astro preview no las simula.
- Confirmar recepción de una consulta autorizada en cada buzón.
- Registrar commit y deploy de retorno. No marcar como operativo sin estas pruebas.

Quedan pendientes los controles de formulario y la revisión final descritos en
`LAUNCH_CHECKLIST.md`. Esta configuración no equivale a un lanzamiento aprobado.

## Validación local de esta preparación

Lint, formato y Astro check pasan (23 archivos, cero diagnósticos). `validate`
se detiene al cargar Vitest por `spawn EPERM` del entorno restringido. Las pruebas
nuevas de indexación y el artefacto Netlify aún requieren ejecución externa.
No se configuraron destinatarios en Netlify, DNS ni servicios remotos.
