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

## D007 — Identidad y contactos, 2026-09-17

En `codex/renovacion-identidad` se conserva la composición y se incorporan los
logos entregados por el usuario. El 2026-09-18 se recibe `horizontal.svg` con las
letras convertidas a trazados. La copia web conserva los cinco trazados visibles
y sus transformaciones relativas, elimina fuentes externas y texto vacío, y
ajusta el viewBox al logo. Ya no necesita recorte CSS ni fuentes instaladas.
Queda pendiente la aprobación visual de la tipografía de esta exportación.
El pie y favicon usan `Solo A.svg`, conservando sus cuatro trazados y colores,
con viewBox ajustado y sin el fondo blanco del lienzo. `prefinal.svg` queda como
referencia, sin uso en la página. Los archivos originales externos no se modifican.

La paleta toma azul marino `#060f54` y cian `#0095d8` del SVG; textos destacados
y botones usan un azul más oscuro `#006a9b` para mantener contraste. Fondos claros
y composición existentes se conservan. WhatsApp y llamadas se configuran por
separado en `src/config/site.ts`; el correo continúa como placeholder, sin envío.
El despliegue queda limitado a `master`, incluso en ejecuciones manuales.

## D008 — Legibilidad y sexto servicio

Se agrega Servicios informáticos al final, identificado como complemento de un
colaborador, sin cambiar el foco eléctrico del hero ni agregar otra llamada a
la acción. Incluye automatización, web, datos, ERP y revisión de ciberseguridad,
sin prometer certificaciones ni alcances de auditoría no confirmados.

Se mantienen los colores del logo con fondo marfil suave, superficies blancas,
texto principal de 18 px y mayor tamaño en escritorio. Enlaces principales y
botones tienen áreas de pulsación amplias; servicios en tarjetas discretas y
transiciones CSS cortas, desactivadas cuando se prefiere movimiento reducido.
Sin librerías, fuentes remotas, carruseles ni JavaScript adicional.

## D009 — Segunda pasada visual y correo

Punto de retorno: commit `8e6b75b`. Se mantienen secciones y orden; se reducen
tarjetas y sombras, se unifican radios y espaciado y se diferencia el cierre:
WhatsApp directo y llamadas junto a un panel claro de consulta opcional. Se
mantienen estados de teclado y transiciones que respetan movimiento reducido.

El usuario elige envío desde la página a su correo provisional. Se prepara
Formspree mediante fetch nativo y un ID público de build, pendiente de activación
del proveedor. No hay contraseñas, envíos al escribir ni reintentos automáticos.
Se conserva el texto, se bloquea doble envío mientras espera y los errores no
se presentan como éxito. Configuración y aceptación en [EMAIL_SETUP.md](EMAIL_SETUP.md).

## D010 — Fotografías y contenido de presentación

Dos carruseles manuales reutilizan un componente sin dependencias: cuatro fotos
en la cabecera (solar2, solar4, poste2 y eolico1) y doce en trabajos. La galería
muestra dos fotos en escritorio y una en móvil, con altura acotada, botones,
teclado y arrastre horizontal. La navegación vuelve al inicio al llegar al final;
no hay avance automático. Sin JavaScript queda un listado desplazable horizontal.
Se conservan las fotografías originales completas, incluidos collages, sin retoques.

Se eliminan avisos visibles de revisión y textos redundantes. Los fallos reales
de contacto siguen siendo visibles; quitar avisos no equivale a certificar la
entrega del correo ni a cambiar la política de indexación o publicar el sitio.

## D011 — Carruseles individuales y visor

Reemplaza la presentación de D010: cabecera con texto arriba y fotografías
debajo; ambos carruseles muestran una sola foto por vez. Rotación cada siete
segundos únicamente con el carrusel visible y la pestaña activa. Pausa explícita,
pausa al interactuar y suspensión mientras el ratón está encima. Movimiento
reducido inicia sin reproducción; el usuario puede activarla expresamente.

Visor con `dialog` nativo, cierre por botón o Escape y retorno del foco. Reutiliza
el archivo original, sin librerías, recortes, deformaciones ni navegación externa.
No se amplía la resolución de las fotografías de origen; la nitidez depende de
ella. El desplazamiento vertical táctil sigue disponible.

## D012 — Netlify Forms reemplaza Formspree

Se migra por el requisito de notificar a dos buzones sin añadir servidor ni SDK.
Una sola petición POST al mismo origen, URL-encoded y con nombre de formulario
estable. El HTML estático declara los campos para detección durante el deploy.
Se añade honeypot, conservando timeout, errores y bloqueo de envíos simultáneos.
Los destinatarios se configuran en el panel, nunca en campos controlados por el
visitante. Se desactiva correo en builds fuera de Netlify mediante bandera pública;
esto es configuración de interfaz, no un control de seguridad del backend.
Detección, dos notificaciones y entrega real pendientes según `EMAIL_SETUP.md`.
Esta decisión reemplaza la integración de correo descrita en D009.

## Referencias técnicas

- [Instalación y requisitos de Astro](https://docs.astro.build/en/install-and-setup/)
- [TypeScript en Astro](https://docs.astro.build/en/guides/typescript/)
- [ESLint para Astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/)
- [Vitest: passWithNoTests](https://vitest.dev/config/passwithnotests)
- [Accesibilidad con Playwright](https://playwright.dev/docs/accessibility-testing)
