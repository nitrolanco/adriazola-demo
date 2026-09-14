# Propuesta visual inicial

Maqueta revisable en /propuesta/index.html del servidor local. No modifica la home técnica.
Antes de publicar, retirar public/propuesta: es material de revisión y se copiaría
al build estático. El noindex de la maqueta no sustituye retirarla de producción.

## Dirección propuesta

Fondo blanco cálido #F6F7F3, texto azul profundo #172F3D y acciones verde petróleo
#17675C. Jerarquía tipográfica clara, espacios amplios, bordes discretos y radios
pequeños. Sin degradados, carruseles ni animaciones decorativas.

Tipografía de sistema para revisar proporciones sin descargar fuentes. Marca
tipográfica provisional: la captura de publicidad disponible no es un archivo de
logo limpio. No se crea un logo nuevo ni se condiciona la composición al antiguo.

En móvil: una columna, contacto visible tras la propuesta de valor, fotografías
debajo del texto. En escritorio: presentación y fotografía en dos columnas;
servicios separados por líneas y contacto sobre fondo azul profundo.

## Fotografías provisionales

Tres archivos elegidos al azar del ZIP aportado, inspeccionados antes de usar:

| Copia local | Archivo original                               | Uso                                |
| ----------- | ---------------------------------------------- | ---------------------------------- |
| foto-1.jpg  | WhatsApp Image 2026-09-09 at 11.28.13.jpeg     | Trabajo eléctrico en terreno       |
| foto-2.jpg  | WhatsApp Image 2026-09-09 at 11.28.15 (3).jpeg | Aerogenerador                      |
| foto-3.jpg  | WhatsApp Image 2026-09-09 at 11.28.14 (1).jpeg | Presentación con instalación solar |

Las copias están en public/propuesta. Originales intactos. Sin atribución de cliente,
fecha de obra ni localidad. Resoluciones reducidas: la selección y recortes deben
revisarse antes de producción; especialmente la imagen vertical del aerogenerador.

## Alcance de interacción

Navegación interna y despliegue de la opción correo funcionales. Los controles de
contacto solo muestran un aviso de demostración, sin red ni almacenamiento. El
mensaje se conserva al desplegar correo. No se afirma envío de datos.

Actualización del formulario confirmada: email y teléfono opcionales por separado;
al menos uno obligatorio para correo, ambos permitidos. WhatsApp no exige ninguno.
La maqueta valida consulta vacía, ausencia de ambos contactos para correo y formato
del email aportado. La recepción futura deberá incluir los contactos para seguimiento
y repetir las validaciones en servidor. Los destinos siguen sin conectar.

## Decisiones para revisión

Paleta aprobada por el usuario: blanco cálido, azul profundo y verde petróleo.
Las imágenes y la composición siguen siendo propuestas; la aprobación de la paleta
no implica aprobación definitiva del logo ni de toda la identidad visual.
La maqueta es independiente del código de producción; una vez elegida la dirección,
se implementará en Astro con los controles de calidad acordados.

## Verificación de la propuesta

Inspección local en navegador a 390 y 320 px y revisión de composición a 1280 px.
Sin desbordamiento horizontal en las mediciones de 320 y 1280 px. Las tres imágenes
cargan. El enlace Contacto navega al bloque correspondiente; desplegar correo
conserva la consulta y pulsar enviar muestra el aviso de demostración. Formato
comprobado. Esto no sustituye los E2E y revisión de accesibilidad de la futura
implementación Astro.
