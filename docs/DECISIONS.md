# Decisiones

## D001 — Aplicación estática mínima

Astro sin adaptador ni framework UI, TypeScript strict y CSS nativo. Permite
publicar dist en Netlify posteriormente y evita JavaScript cliente innecesario.
El bootstrap se crea manualmente para no incorporar la UI de una plantilla.

## D002 — Runtime y reproducibilidad

Node 24 LTS, npm y versiones exactas con lockfile. El equipo tiene Node 20.14.0,
incompatible con Astro actual; la validación usa Node 24.19.0 disponible en el
entorno. No se modifica la instalación global del equipo. engine-strict impide
instalar con un runtime incompatible. La caché npm queda local por las restricciones
de escritura de este entorno.

## D003 — Pruebas proporcionales

Vitest configurado solo para tests/unit. Inicialmente se permitió una suite vacía;
en etapa 5 se retira passWithNoTests al incorporar validación real de contacto.
Playwright sobre
build estático con Chromium escritorio y móvil, incluyendo axe mediante
@axe-core/playwright. Sin framework de componentes, jsdom ni pruebas ficticias.

## D004 — Alcance local y contenido provisional

Sin Netlify, GitHub Actions, formulario ni dominio en estas fases. Metadatos
provisionales con noindex hasta preparar publicación. Tokens neutrales sin diseño
comercial. Las decisiones de negocio quedan pendientes en la especificación.

## D005 — Puertos locales disponibles

Desarrollo en 3000 y preview E2E en 3100. Windows reserva actualmente el intervalo
4279–4378 en este equipo, que incluye los puertos anteriores. Se comprobó que los
nuevos puertos permiten escucha local. La URL y el comando E2E comparten una única
constante para evitar desajustes. No modificar reservas del sistema operativo.

## D006 — Demo pública en GitHub Pages

El usuario autoriza un repositorio público `adriazola-demo` para revisión con el
cliente. Esta etapa amplía D004: se incorpora GitHub Actions solo para validar y
publicar la demo estática, sin backend, dominio ni Netlify. Se mantiene `noindex`
y el aviso de contacto temporal. Pages proporciona origen y subruta al build;
los E2E prueban esa misma subruta e incluyen la carga de imágenes. La maqueta
antigua queda fuera del artefacto publicado. Procedimiento único en
[GITHUB_PAGES.md](GITHUB_PAGES.md).

## Referencias técnicas

- [Instalación y requisitos de Astro](https://docs.astro.build/en/install-and-setup/)
- [TypeScript en Astro](https://docs.astro.build/en/guides/typescript/)
- [ESLint para Astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/)
- [Vitest: passWithNoTests](https://vitest.dev/config/passwithnotests)
- [Accesibilidad con Playwright](https://playwright.dev/docs/accessibility-testing)
