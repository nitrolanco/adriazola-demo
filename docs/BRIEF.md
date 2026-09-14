# Brief de Adriazola Electricidad

Etapa 2 — definición comercial de la primera landing, septiembre de 2026.
Estado: definición comercial de etapa 2 completada con las respuestas del usuario.
Destinos y proveedor de contacto pendientes para implementación. No autoriza todavía
implementación visual ni conexiones productivas.

## Objetivo y público

Explicar con claridad qué ofrece Adriazola Electricidad y convertir visitas de
particulares y pymes en conversaciones comerciales, principalmente por WhatsApp.
El formulario permitirá preparar una consulta para WhatsApp o enviarla por correo,
con el mínimo de campos necesario. No incorporar carrito ni pagos: la venta se
inicia mediante contacto.

El público no se define por una edad concreta. La presentación debe ser fácil de
leer, sobria y accesible, sin depender de tendencias visuales juveniles.

## Oferta

El usuario confirma una oferta amplia, sin priorizar por ahora dos o tres servicios:
proyectos, instalaciones, mantenimiento y venta de equipos o materiales. El catálogo
concreto y la disponibilidad de productos no están definidos.

La carta aporta estas familias para ordenar posteriormente el contenido:

- Electricidad: instalaciones domiciliarias e industriales, tableros, fuerza,
  control e iluminación.
- Energía: soluciones solares y eólicas.
- Especialidades: climatización, cámaras, datos y sistemas de incendio.
- Soporte: mantenimiento, posventa, diagnóstico e informes.

Las obras civiles y otros proyectos especializados presentes en la carta quedan
como antecedentes; no es necesario darles igual protagonismo en la primera landing.
La jerarquía de contenido deberá facilitar que particulares y pymes identifiquen
su necesidad sin recorrer un listado técnico extenso.

## Propuesta de valor de trabajo

Propuesta editorial para revisar en la siguiente etapa, no texto final aprobado:
“Soluciones eléctricas para tu hogar y tu negocio. Proyectos, instalaciones,
mantenimiento y orientación para elegir equipos y materiales.”

La experiencia documentada puede aportar confianza mediante una selección de
trabajos reales. No prometer plazos, atención 24/7, precios, certificaciones,
garantías específicas ni relaciones oficiales con marcas sin confirmación.

## Conversión y contacto

WhatsApp es el canal principal. El usuario autorizó temporalmente +56 9 2185 7885
y reddataspa@gmail.com como correo receptor. Ambos están centralizados en
src/config/site.ts para sustituirlos después. No usar los contactos de la carta.

Recorrido propuesto: comprender la oferta → reconocer el servicio necesario →
consultar por WhatsApp. El visitante debe poder contactar sin llenar un formulario.
La apertura del chat no equivale a un mensaje enviado ni a una venta realizada.

El usuario confirma ambos recorridos, con mínima fricción. Propuesta funcional
para concretar en la etapa de estructura y contenido:

1. Preparar una consulta y abrir WhatsApp con el mensaje listo para que el visitante
   lo revise y envíe. Este recorrido no enviará además una copia por correo.
2. Enviar la consulta por correo desde la web, mediante un servicio de recepción,
   sin depender de que el visitante tenga una aplicación de correo configurada.

Un único formulario conserva el mensaje al elegir o cambiar de canal. Para
WhatsApp, solo pedir la consulta; no exigir nombre, teléfono ni correo. Para el
envío por correo, ofrecer email y teléfono: cada campo es opcional individualmente,
pero al menos uno debe estar completo; se permiten ambos. Si se indica email,
comprobar su formato. La consulta debe incluir los contactos aportados para permitir
el seguimiento, aunque la recepción interna sea por correo. No exigir empresa, RUT,
dirección ni adjuntos. Propuesta de ayuda dentro del campo: “Cuéntanos qué necesitas
y en qué localidad”. La localidad puede describirse en el mensaje sin añadir un
campo obligatorio inicial.

Usar acciones explícitas: “Continuar en WhatsApp” y “Enviar por correo”, con mayor
jerarquía para WhatsApp. Mantener también acceso directo al chat sin formulario.
No enviar automáticamente por ambos canales. Conservar los datos ante errores y
ofrecer el otro canal como alternativa, sin enviar nada sin acción del visitante.

Antes de conectar el correo: elegir proveedor y configurar el receptor; definir
validación servidor para correo, antispam, tratamiento de datos y estados de envío.
Mostrar éxito del correo solo tras aceptación por el servicio, sin prometer lectura
ni entrega final. Probar cada recorrido y sus errores cuando se implemente.

No mostrar enlaces de contacto falsos ni confirmaciones de envío simuladas. La
conexión real se implementará y verificará cuando exista el destino definitivo.

## Dirección visual

Diseño claro y minimalista, que proyecte confianza y modernidad moderada. Fresco,
legible y profesional. Evitar saturación de elementos y llamadas a la acción que
compitan entre sí.

El logo existente es solo un placeholder; será mejorado. La página no se diseñará
alrededor de ese logo. No hay paleta definitiva aprobada: explorar colores en la
etapa de dirección visual y verificar contraste. La sugerencia anterior de azules
no constituye una decisión del usuario.

## Material y vigencia

Referencias de solo lectura: CARTA PRESENTACION 2026.docx, PUBLICIDAD ELECTRICIDAD.png
y archivo ZIP con doce fotos, en la carpeta material aportada por el usuario.
Se revisó el texto de la carta y la publicidad; falta revisar individualmente las
fotos y seleccionar imágenes adecuadas antes de usarlas.

El usuario confirma 2026 como vigencia de la presentación. Eso no cambia las fechas
históricas de obras citadas en la carta (por ejemplo, 2013, 2014 y 2016), ni autoriza
a presentar todos los proyectos como ejecutados en 2026. Los originales se conservan.

El usuario confirma atención en toda la región de Aysén. La cobertura regional no
implica disponibilidad inmediata ni desplazamientos gratuitos; no inventar esas
condiciones en los textos.

## Preparación para cambios grandes

Mantener Astro estático y la arquitectura mínima acordada. Al implementar, separar
los datos de contacto compartidos, los textos editables y los tokens visuales donde
aporte claridad. Crear componentes por responsabilidad concreta; evitar motores
de secciones configurables, CMS o abstracciones anticipadas.

La sustitución del logo, fotografías y textos debe ser sencilla. Las pruebas deben
verificar recorridos y accesibilidad, evitando depender de la composición visual
exacta o de textos comerciales sujetos a revisión.

## Cierre de etapa

Confirmado: marca, público, amplitud de oferta, WhatsApp principal, formulario con
opciones de WhatsApp y correo y mínimo input, cobertura en toda la región de Aysén,
dirección visual general, logo provisional y vigencia 2026.

El brief permite pasar a contenido y wireframes. El número nuevo, el correo receptor
y el proveedor pueden quedar pendientes durante esa etapa, pero serán obligatorios
antes de activar y probar el contacto. La propuesta concreta de campos y acciones
se revisará junto con la estructura.

Después: revisar estructura y textos en etapa 3; aprobar dirección visual en etapa 4. No implementar aún secciones finales.
