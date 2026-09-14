# Registro de validación — 2026-09-13

## Cierre para revisión del cliente

Se corrigió un fallo de formato en tests/e2e/contact.spec.ts, sin cambiar su
comportamiento. El primer commit no se creó: el intento de git add falló al crear
.git/index.lock incluso después de conceder permiso de escritura sobre .git.
Ver docs/CLIENT_REVIEW.md para el alcance de la presentación y el guardado manual.

## Incremento posterior: WhatsApp temporal

Conexión de enlaces a WhatsApp con contactos temporales autorizados centralizados.
No se envió ningún mensaje real ni se verificó la recepción en el dispositivo.
Correo receptor registrado, sin proveedor de formulario conectado todavía.

Formato, lint y Astro check pasan. Comprobación directa con Node del destino,
codificación de acentos/símbolos/saltos de línea y contactos opcionales correcta.
Se añadieron tres casos unitarios (15 en total) y dos ejecuciones E2E para el chat
(14 E2E en total). Playwright descubre los casos; las pruebas interceptan wa.me
para no contactar WhatsApp. Ejecución completa pendiente en la PowerShell del usuario
por el bloqueo de subprocesos conocido. El verde de la etapa 5 de abajo corresponde
al incremento anterior, no a esta conexión.

Referencia de formato: [Click to chat de WhatsApp](https://faq.whatsapp.com/5913398998672934).

## Estado actual de etapa 5

El usuario confirmó la base técnica después de la corrección de puertos y su
ejecución manual. Las entradas posteriores conservan la historia del bootstrap.

La propuesta se integró en la home Astro con cuatro componentes de sección,
tokens aprobados y reglas de contacto en src/lib/contact.ts. Envíos desactivados.

- Formato y lint ejecutados correctamente.
- Astro check: 14 archivos, cero errores, advertencias o hints.
- Doce comprobaciones directas de la función de validación pasan con Node 24.
- Se prepararon doce casos unitarios de Vitest antes de implementar la función.
  La sesión del agente no pudo ejecutarlos por spawn EPERM. La ejecución posterior
  en PowerShell del usuario confirma 12/12 correctos (Vitest 5.0.0, 1,06 s).
  No se afirma haber completado un ciclo TDD rojo/verde.
- Build estático correcto: una página, 921 ms, según salida compartida por el usuario.
- Playwright: 12/12 correctos en 14,3 s, escritorio y móvil, incluyendo axe,
  contacto, carga/recarga y ausencia de desbordamiento hasta 320 px.
- En el navegador conectado se verificaron consulta vacía y foco, falta de ambos
  contactos, solo email, solo teléfono, ambos, email inválido y cambio a WhatsApp.
  Los estados son correctos y no hay envío productivo.

Incremento local validado: formato, lint y tipos comprobados por el agente;
Vitest, build y E2E confirmados por la salida del usuario a las 20:32–20:33.
No se añadieron dependencias. El bloqueo de subprocesos persiste en la sesión del
agente, pero no impide validar desde la PowerShell del usuario. Esta aceptación
no implica que los canales reales estén conectados ni que el sitio esté publicado.

Pendientes de producto: número nuevo, correo receptor, proveedor de recepción,
validación servidor y política de datos; logo y fotos definitivos. La maqueta en
public/propuesta debe retirarse antes de publicar.

## Entorno inspeccionado

Windows, PowerShell, npm 10.7.0 y Git 2.40.0. Directorio inicialmente sin aplicación
ni repositorio. sources vacío, conservado intacto. Git inicializado sin commits ni
remoto. Node global 20.14.0; ejecución con Node 24.19.0 del runtime disponible.

## Comprobaciones realizadas

| Comando                                                   | Resultado                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| npm install astro / npm install -D … --foreground-scripts | Dependencias instaladas y lockfile generado; auditoría npm: 0 vulnerabilidades |
| git init                                                  | Repositorio creado                                                             |
| npm run format                                            | Formato aplicado                                                               |
| npm run lint                                              | Correcto, sin advertencias                                                     |
| npm run format:check                                      | Correcto                                                                       |
| npm run typecheck                                         | 6 archivos, 0 errores, 0 advertencias, 0 hints                                 |
| Playwright test --list                                    | Configuración cargada; 6 casos descubiertos (3 × escritorio/móvil)             |
| npm run build                                             | Bloqueado: spawn EPERM al iniciar esbuild                                      |
| npm test                                                  | Bloqueado: spawn EPERM al cargar configuración con Vite                        |
| npm run test:e2e:install                                  | Bloqueado: spawn EPERM al iniciar el proceso de descarga                       |
| npm run dev -- --host 127.0.0.1                           | Proceso termina antes de estar listo; no se comprobó respuesta HTTP            |
| npm run validate                                          | No está verde; ver bloqueo del entorno                                         |

No se ejecutaron pruebas en navegador, no se verificó preview y no se certifica
el build. No hay pruebas unitarias porque aún no existe lógica de dominio.

## Diagnóstico

Una reproducción mínima con Node 20 y Node 24 muestra que spawnSync de un proceso
con salida capturada falla con EPERM, incluso ejecutando node --version. El mismo
proceso con stdio inherit funciona. El bloqueo no depende del código de la landing.
La instalación inicial también falló al lanzar postinstall; se completó usando la
opción estándar foreground-scripts. No se alteraron dependencias para evitar el
bloqueo ni se desactivaron verificaciones del proyecto.

Astro intentó además escribir la configuración de telemetría fuera del proyecto.
Para las comprobaciones posteriores se usó ASTRO_TELEMETRY_DISABLED=1 en la sesión;
con ello typecheck pasó. No se modificó la configuración global de Astro.

## Reanudar y aceptar la etapa

En una terminal local que permita los subprocesos normales de Node, seleccionar
Node 24.19.0 y ejecutar desde la raíz:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm ci
npm run test:e2e:install
npm run validate
npm run dev
```

Confirmar respuesta de http://localhost:3000. npm ci debe completar también los
scripts de instalación. Si falla cualquier comprobación, diagnosticarla antes de
aceptar Fase 1 o avanzar a diseño. La aprobación del entorno para red no resolvió
el bloqueo de subprocesos; esta sesión no ofrece una concesión de permisos de
procesos mediante la herramienta de permisos disponible.

Pendientes posteriores al verde: primer commit autorizado, definición de negocio
y revisión manual de accesibilidad cuando exista UI. Navegadores adicionales,
performance de producción y SEO definitivo quedan sujetos a la especificación.

## Seguimiento: ejecución manual y puertos reservados

La salida compartida por el usuario confirma que el build estático termina
correctamente fuera del entorno restringido. Playwright falla después al iniciar
preview en 127.0.0.1:4322 con EACCES; todavía no ejecuta las pruebas.

Se consultaron las exclusiones TCP de Windows: el intervalo 4279–4378 está
reservado, incluyendo tanto 4321 como 4322. Se verificó mediante escucha TCP
temporal que 3000 y 3100 están disponibles. Astro pasa a 3000 y el preview de
Playwright a 3100. Pendiente repetir npm run validate y comprobar npm run dev
en la terminal del usuario. No es necesario reinstalar dependencias por este error.
