# Adriazola · revisión de diseño V2

27 de octubre de 2026. Rama de trabajo: `codex/adriazola-v2`.

## Alcance acordado

Renovar la presentación manteniendo textos aprobados, logo, fotografías originales
y facilidad de contacto. Se conservan las cuatro secciones, los seis servicios,
las doce fotografías y los canales de WhatsApp, teléfono y Netlify Forms.

La referencia es Landing Factory V2, utilizada para Prisma: flujo de brief,
composición corporativa, CSS nativo, revisión visual y validación antes de hosting.
La composición de Adriazola se adapta en su aplicación Astro existente. No se
migra al esquema JSON del generador ni se copia la aplicación de Prisma; así se
conservan el formulario y los carruseles ya probados. Los textos de servicios
se centralizan en `src/content/services.ts` sin cambiar su contenido.

## Punto de partida y publicación

- Repositorio: `nitrolanco/adriazola-demo`.
- Base: `752e471`, punta remota de `codex/renovacion-identidad` al comenzar.
- `master` sigue en `ef0d426`; su workflow publica la demo de GitHub Pages.
- La copia sincronizada de ChatGPT y los proyectos de Landing Factory/Prisma
  permanecen intactos. Esta carpeta es un clon independiente.
- El dominio público respondió HTTP 200 desde Netlify durante la preparación.
- GitHub no mostró publicaciones Netlify ni estados de Netlify asociados al
  commit base. La rama de producción y el despliegue de retorno deben verificarse
  en la cuenta Netlify antes de publicar. No se supone que `master` la alimente.

El PR se prepara contra `codex/renovacion-identidad`, porque contiene la integración
actual con Netlify Forms. No fusionarlo en `master` sin revisar la separación
entre la demo de GitHub Pages y el sitio Netlify.

## Revisión local

Con Node 24 compatible y dependencias instaladas:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
$env:PUBLIC_NETLIFY_FORMS='true'
$env:PUBLIC_SITE_INDEXABLE='false'
$env:SITE_URL='https://adriazolaelectricidad.cl/'
./run.ps1 run validate
./run.ps1 run build:netlify
./run.ps1 run preview --host 127.0.0.1 --port 4323
```

Abrir `http://127.0.0.1:4323/`. El wrapper selecciona el Node compatible sin
cambiar la instalación global. En un equipo con Node compatible se puede usar npm.

Las pruebas de navegador interceptan las solicitudes de WhatsApp y los envíos
del formulario. No equivalen a una comprobación de recepción de correo real.

Validación completada: lint, formato y tipos sin errores; 33 pruebas unitarias y
36 pruebas de navegador aprobadas en escritorio y móvil. La comparación encontró
idénticos los 39 bloques de títulos, párrafos, etiquetas y resúmenes del HTML de
referencia. Los 16 archivos de marca y fotografías conservaron su SHA-256.
Se revisaron capturas a 320, 390, 768 y 1440 px, sin desbordamiento ni recursos o
anclas faltantes. La compilación Netlify excluye el prototipo y conserva noindex.

Las capturas y el informe local están en `playwright-report/review/`, excluido de
Git. `scripts/review-visual.mjs` revisa cuatro anchos, enlaces, imágenes, errores
y zoom CSS al 200 %. Compara los bloques de texto contra una compilación inicial
guardada en `playwright-report/baseline/index.html`; para usarlo en otra copia
hay que aportar esa compilación de referencia. El zoom CSS no sustituye una
auditoría completa con tecnologías de asistencia.

## Paso a Netlify

1. Revisar la vista previa en móvil y escritorio.
2. Comprobar en Netlify qué repositorio/rama construye el dominio, variables
   de producción y el despliegue publicado que servirá de retorno.
3. Si la integración Git ofrece Deploy Previews, comprobar este PR allí.
   Una compilación local o un PR no prueban que esa integración esté habilitada.
4. Mantener la configuración del formulario, destinatarios e indexación vigente.
   La revisión visual no autoriza activar la indexación comercial.
5. Publicar solo la revisión aprobada y comprobar recursos, navegación y contacto.
   Una prueba de recepción real requiere acordar el envío de la consulta.
6. Ante un fallo, restaurar el despliegue registrado en Netlify; corregir en la
   rama de trabajo y repetir únicamente las comprobaciones afectadas.

El workflow `validate-pr.yml` valida el PR y su artefacto; no publica el sitio.
La configuración Netlify original y el workflow existente de GitHub Pages no
se modifican en esta renovación.
