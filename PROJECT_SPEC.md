# Especificación del proyecto

## Alcance y objetivos

Landing page con Astro, desarrollada primero en localhost. Esta entrega comprende
Fase 0 (especificación), Fase 1 (base técnica verificable) y, actualmente,
etapa 5 (implementación local tras definición comercial, contenido y propuesta visual).
Debe permitir
cambiar contenido y diseño gradualmente y publicar más adelante en GitHub y
Netlify con un build estático reproducible.

Las decisiones comerciales y los puntos pendientes antes de diseñar la landing
se mantienen en [docs/BRIEF.md](docs/BRIEF.md).

## No objetivos actuales

La landing local y sus secciones están autorizadas. No implementar dominio,
despliegue, GitHub Actions, analítica, cookies ni recepción productiva del formulario
en esta etapa. No incorporar React, Vue,
Tailwind, Bootstrap, CMS, gestor de estado, Docker o monorepo sin necesidad
demostrada. No prometer ausencia absoluta de bugs: reducir riesgos con controles.

## Stack y principios

Astro estático, TypeScript strict, npm, CSS nativo con design tokens y Git.
ESLint, Prettier y Astro check verifican calidad básica; Vitest verifica lógica
real; Playwright verifica comportamiento y axe accesibilidad automatizable.
Versiones exactas y árbol reproducible en package.json y package-lock.json.

Static-first, HTML-first, CSS-first, JS-last. Preferir HTML semántico y capacidades
nativas del navegador. Agregar JavaScript cliente solo para un comportamiento
definido y probado. Extraer componentes por responsabilidad real o reutilización,
sin construir un sistema de diseño anticipadamente.

## Mobile-first y accesibilidad

Estilos base para pantallas pequeñas; ampliar con min-width cuando el contenido
lo requiera. Evitar anchos rígidos, overflow horizontal y dependencia de hover.
Verificar al menos 320, 390 y 1280 píxeles, teclado y zoom manual al cambiar UI.
Objetivo WCAG 2.2 AA: idioma, landmarks, encabezados coherentes, un h1 por página,
foco visible, contraste suficiente, nombres accesibles y movimiento reducido.
axe no reemplaza revisión manual, lector de pantalla ni certifica conformidad.

## Estrategia de testing

- TDD para lógica y comportamientos nuevos: caso que falla, implementación mínima,
  refactorización con pruebas verdes.
- No crear funciones para justificar pruebas unitarias. La validación de contacto
  es ahora lógica real y tiene pruebas; Vitest ya no admite una suite vacía.
- E2E sobre el build servido con preview: respuesta correcta, documento visible,
  un h1, recursos sin errores, recarga, accesibilidad y ausencia de overflow.
- Chromium móvil y escritorio como base local; ampliar navegadores al definir
  soporte, antes de publicar.
- Toda corrección funcional debe incluir una prueba de regresión cuando aporte
  valor. Evitar snapshots masivos, pruebas de detalles internos y umbrales de
  cobertura arbitrarios.

## Performance y SEO

Base sin fuentes remotas ni solicitudes a terceros. JavaScript cliente limitado a
validación y avisos de contacto local. En fases
visuales: imágenes dimensionadas y optimizadas, lazy loading fuera del primer
viewport y evaluación del recurso LCP. Objetivos futuros de campo: LCP <= 2,5 s,
INP <= 200 ms y CLS <= 0,1 en percentil 75; no medibles aún sin tráfico real.
Revisar con Lighthouse antes de publicar, sin añadir herramientas al bootstrap.

Cada página tendrá title, description, lang y HTML semántico. La home provisional
lleva noindex. Antes de producción: quitar noindex, definir URL real, canonical,
Open Graph, favicon y política de sitemap/robots. No inventar dominio ni datos
estructurados comerciales.

## Formulario futuro

WhatsApp y correo con mínima fricción, según el contrato propuesto en
[docs/BRIEF.md](docs/BRIEF.md). Pendientes los destinos definitivos, proveedor,
consentimiento y conservación de datos.
No capturar ni enviar datos en esta fase. Antes de implementarlo definir contrato
de envío, validación servidor, protección antispam, estados accesibles de éxito y
error, reintentos y alternativa de contacto. Validación cliente solo como ayuda;
secretos nunca en el navegador. Elegir proveedor cuando exista el requisito.

## Definition of Done de Fases 0 y 1

- Documentación consistente y decisiones relevantes registradas una sola vez.
- Node compatible declarado, dependencias bloqueadas y Git inicializado.
- dev y preview sirven la home; build genera dist estático.
- lint, format:check, typecheck, Vitest y E2E pasan mediante npm run validate.
- Sin errores de consola, recursos fallidos o violaciones axe en los casos probados.
- Referencias sincronizadas intactas, sin secretos ni archivos generados en Git.
- Limitaciones y comprobaciones realizadas registradas; sin avanzar a diseño.
