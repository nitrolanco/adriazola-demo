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

Incremento local de etapa 5 validado: formato, lint y tipos pasan; la salida de la
PowerShell del usuario confirma 12 pruebas unitarias, build y 12 E2E correctos.
La conexión posterior de WhatsApp requiere revalidación. Ver el registro de validación para evidencia
y limitaciones del entorno.
