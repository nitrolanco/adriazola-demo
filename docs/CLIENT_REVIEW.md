# Versión para revisión del cliente

Punto de control local de Adriazola Electricidad. Preparado para revisar diseño,
contenido y recorrido comercial en una reunión; no es una entrega publicada.

## Qué mostrar

Abrir http://localhost:3000/ con el servidor de desarrollo activo. Esta es la
landing actual en Astro. /propuesta/index.html conserva una maqueta anterior.

1. Presentación de la oferta para particulares y pymes de toda la región de Aysén.
2. Servicios y selección provisional de fotografías reales aportadas.
3. Legibilidad en móvil y escritorio, paleta aprobada y acceso a contacto.
4. Consulta breve y alternativa de email o teléfono para seguimiento.

Los botones de WhatsApp apuntan al número temporal del usuario y pueden abrir un
chat real. El visitante debe confirmar el envío dentro de WhatsApp. El formulario
por correo solo valida los datos y muestra que el envío está pendiente; no manda
correos ni debe presentarse como una función operativa.

## Qué pedir al cliente

- Confirmar que los servicios y el lenguaje representan su oferta actual.
- Identificar cambios de prioridad, información ausente o textos poco claros.
- Revisar logo, fotografías y correspondencia de las imágenes con los trabajos.
- Confirmar contactos definitivos y quién responderá las consultas.

Registrar comentarios antes de implementar cambios, separando los necesarios para
publicar de mejoras que puedan quedar para otra versión.

## Estado de calidad

La versión previa a conectar WhatsApp pasó 12 pruebas unitarias, build y 12 E2E,
con evidencia de la PowerShell del usuario. La versión con WhatsApp incorpora
15 unitarias y 14 E2E y requiere cerrar su validación completa. Consultar
docs/VALIDATION.md para los resultados vigentes. Guardar este punto de control
en Git no significa certificar que esa validación pendiente haya pasado.

El primer commit sigue pendiente: aunque se concedió permiso de escritura sobre
.git al agente, Git rechazó crear .git/index.lock. No se llegó a preparar el índice
ni a crear un commit. Completar el guardado desde la PowerShell del usuario:

```powershell
git add .
if ($LASTEXITCODE -ne 0) { throw 'No se pudieron preparar los archivos' }
git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Revisar el diff antes del commit' }
git commit -m "chore: save local client review version"
```

Este comando guarda un punto de revisión local, sin publicar en GitHub ni desplegar.
Ejecutar también node $npmCli run validate en la terminal preparada con Node 24;
la aceptación técnica del último incremento depende de ese resultado.

## Pendientes antes de publicar

- Ejecutar npm run validate de la versión actual con Node 24 y resolver fallos.
- Probar WhatsApp en un teléfono real y confirmar el destino y el mensaje.
- Sustituir los contactos temporales centralizados en src/config/site.ts.
- Configurar recepción y notificaciones del formulario en Netlify, validación
  servidor, tratamiento de errores, antispam e información de privacidad.
- Aprobar textos finales, logo y fotografías; revisar accesibilidad manual y
  rendimiento sobre el contenido definitivo.
- Crear el repositorio remoto GitHub, conectar Netlify y definir dominio.
- Completar SEO y metadatos, quitar noindex cuando corresponda y retirar la
  maqueta public/propuesta del build que se vaya a publicar.

Por decisión del usuario, correo y publicación permanecen pendientes. No se crea
ningún servicio externo como parte de este punto de control.
