# Arquitectura

Una aplicación Astro estática. Las rutas se generan en build y se publicarán
desde dist. No hay servidor de aplicación, adaptador, framework UI ni API.

| Ruta              | Responsabilidad                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| src/pages         | Rutas; index.astro compone la landing local                                       |
| src/layouts       | Documento HTML común, metadatos e importación de estilos                          |
| src/components    | Presentación, servicios, trabajos y formulario, separados por responsabilidad     |
| src/styles        | Paleta en tokens.css, estilos de la landing en landing.css, entrada en global.css |
| src/config        | Metadatos compartidos en site.ts                                                  |
| src/lib           | Reglas de validación de contacto independientes del navegador                     |
| src/content       | Contenido cuando exista; sin colecciones ni esquema anticipado                    |
| public            | Archivos copiados sin transformar                                                 |
| tests/unit        | Casos de validación del mensaje y de los contactos por canal                      |
| tests/e2e         | Contrato observable de la página construida y accesibilidad                       |
| docs/DECISIONS.md | Registro breve de decisiones y sus motivos                                        |

Las carpetas vacías se conservan con .gitkeep. BaseLayout recibe metadatos
explícitos y contenido por slot. La página es responsable de su main y h1.
Los tokens recogen la paleta aprobada y permanecen reemplazables.

El formulario valida localmente con JavaScript pequeño procesado por Astro; no
hay framework UI. Con JavaScript deshabilitado, los botones de demostración
permanecen deshabilitados y se muestra una explicación; el enlace directo a WhatsApp
funciona sin JavaScript. Nunca se envían datos mediante una navegación accidental.
La recepción por correo sigue pendiente.

Los contactos temporales están en src/config/site.ts. La URL de WhatsApp se genera
con codificación del mensaje y contactos opcionales, sin API, tokens ni contraseñas.
El visitante revisa y envía el mensaje en WhatsApp. El formulario conserva sus datos
en la página y ofrece un enlace alternativo si la nueva pestaña no se abre.

public/images contiene copias de fotos provisionales independientes de la maqueta.
public/propuesta conserva la referencia visual previa y debe retirarse antes de
publicar. Los textos están en sus componentes, sin motor de contenido configurable.

Flujo: fuentes → Astro build → dist → servidor estático. Playwright arranca su
propio preview en un puerto fijo y falla si está ocupado, evitando probar otro
servidor por accidente. No depende de tener dev abierto.

La configuración de herramientas permanece en la raíz. No crear capas de
servicios, repositorios, alias ni utilidades hasta que un caso concreto lo exija.
El directorio sources pertenece al espejo de ChatGPT: solo lectura, excluido de
Git y herramientas del proyecto.
