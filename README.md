# Adriazola Electricidad

Renovación visual V2 preparada para revisión el 27 de octubre de 2026. Conserva
textos aprobados, logo, fotografías y canales de contacto. Ver
[alcance, validación y publicación de V2](docs/RENOVACION_V2.md).

Aplicación Astro estática con formulario Netlify y contacto por WhatsApp.
La renovación se revisa en una rama independiente antes de actualizar el sitio
público. Los documentos de etapas anteriores conservan contexto histórico;
la guía V2 describe esta entrega.

Con Node 24.19.0 y npm >= 10:

```sh
npm ci
npm run test:e2e:install
npm run dev
```

Abrir http://localhost:3000. Para comprobar la base: npm run validate.

- [Especificación y criterios de salida](PROJECT_SPEC.md)
- [Brief comercial de la etapa 2](docs/BRIEF.md)
- [Estructura móvil y textos de la etapa 3](docs/CONTENT_PLAN.md)
- [Dirección visual propuesta](docs/VISUAL_DIRECTION.md): maqueta local en http://localhost:3000/propuesta/index.html
- [Arquitectura](ARCHITECTURE.md)
- [Entorno, comandos y protocolo de contribución](CONTRIBUTING.md)
- [Decisiones](docs/DECISIONS.md)
- [Resultados de validación](docs/VALIDATION.md)
- [Guía para mostrar esta versión al cliente](docs/CLIENT_REVIEW.md)
- [Publicar la demo en GitHub Pages](docs/GITHUB_PAGES.md)
- [Activar y verificar el correo del formulario](docs/EMAIL_SETUP.md)

Validación V2: formato, lint, tipos, 33 pruebas unitarias, 36 pruebas de navegador
y compilación Netlify correctos. Capturas revisadas en móvil, tablet y escritorio;
39 bloques de texto y 16 archivos de marca/fotografías conservados. Los envíos se
interceptaron en las pruebas; no se comprobó recepción de correo real. La rama y
el despliegue de retorno de producción requieren verificación en Netlify antes
de publicar.
