# Landing Astro — base local

Landing local de Adriazola Electricidad. Etapa 5: propuesta visual integrada en
Astro, con fotos provisionales y validación de contacto. WhatsApp usa un número
temporal; la recepción del formulario por correo sigue pendiente.

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

Validación local confirmada por la salida de PowerShell del usuario el 2026-09-15:
formato, lint, tipos, 15 pruebas unitarias, build y 14 E2E correctos, incluyendo
WhatsApp. La subruta de GitHub Pages y el despliegue remoto siguen pendientes de
validación en Actions. Ver el registro de validación para evidencia y limitaciones.
