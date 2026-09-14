# Contribuir

## Entorno y primera ejecución

Usar Node 24 LTS (24.19.0 para esta base) y npm >= 10. La versión se declara en
.nvmrc y package.json. Con un gestor compatible: nvm install y nvm use; verificar
node --version antes de instalar. No usar el Node 20 preexistente del equipo.

```sh
npm ci
npm run test:e2e:install
npm run dev
```

La home estará en http://localhost:3000. Playwright instala Chromium dentro de
node_modules; se reinstala después de npm ci. En Linux pueden requerirse las
bibliotecas del sistema de Playwright (npx playwright install-deps chromium).

## Comandos

| Comando                           | Propósito                                    |
| --------------------------------- | -------------------------------------------- |
| npm run dev                       | Desarrollo local                             |
| npm run build                     | Generar dist                                 |
| npm run preview                   | Servir el build local                        |
| npm run lint                      | ESLint sin advertencias permitidas           |
| npm run format                    | Aplicar formato                              |
| npm run format:check              | Comprobar formato sin modificar              |
| npm run typecheck / npm run check | Astro check con TypeScript strict            |
| npm test                          | Vitest una vez; exige encontrar pruebas      |
| npm run test:watch                | Vitest interactivo                           |
| npm run test:e2e:install          | Instalar Chromium de Playwright              |
| npm run test:e2e                  | Build y pruebas E2E sobre preview            |
| npm run validate                  | Lint, formato, tipos, unitarias, build y E2E |

## Protocolo de cambios

1. Leer la especificación y código afectado antes de modificarlo.
2. Delimitar un cambio pequeño con un criterio observable.
3. Si existe comportamiento/lógica nueva, escribir primero su prueba útil.
4. Implementar lo mínimo y ejecutar verificaciones específicas.
5. Ejecutar npm run format y npm run validate antes de dar por terminado el cambio.
6. Revisar diff y estado de Git; actualizar documentación solo si cambió el contrato.

No ocultar fallos ni introducir excepciones generales para conseguir verde.
Registrar decisiones duraderas en docs/DECISIONS.md, requisitos en PROJECT_SPEC.md
y organización en ARCHITECTURE.md. Evitar duplicar explicaciones.

Para cambios visuales futuros verificar además teclado, zoom 200 %, pantallas
pequeñas y lectura del contenido. La automatización cubre solo una parte.

Git se usa desde esta etapa. Hacer commits pequeños y descriptivos cuando se
autorice; nunca versionar .env, dependencias, builds, reportes o sources.
No añadir servicios, integraciones o dependencias sin beneficio concreto.
