# Demo en GitHub Pages

## Alcance

Repositorio público autorizado: `adriazola-demo`, en la cuenta personal del
responsable. Es una revisión para el cliente, no un lanzamiento productivo.
El sitio y el código serán públicos. `noindex,nofollow` desalienta la indexación,
pero no restringe el acceso. WhatsApp usa el número temporal autorizado; el
formulario por correo todavía no envía mensajes.

## Primera publicación

Ejecutar en una terminal propia, desde la raíz del proyecto. No compartir tokens.

1. Comprobar `gh auth status` y `gh api user --jq .login`. Si hace falta iniciar
   sesión: `gh auth login --hostname github.com --git-protocol https --web`.
   Confirmar que es la cuenta personal deseada antes de continuar.
2. Con Node indicado por `.nvmrc`, ejecutar `npm run validate`. Para reproducir
   también la ruta pública en PowerShell:

   ```powershell
   $env:SITE_URL = 'https://TU_USUARIO.github.io'
   $env:SITE_BASE_PATH = '/adriazola-demo/'
   npm run validate
   Remove-Item Env:SITE_URL, Env:SITE_BASE_PATH
   ```

   Continuar solo si la validación termina correctamente. Sustituir `TU_USUARIO`.

3. Revisar `git diff` y `git status`. Registrar únicamente los cambios revisados:
   `git add .` y `git commit -m "chore: prepare GitHub Pages client demo"`.
4. Crear el repositorio vacío y configurar el remoto:
   `gh repo create adriazola-demo --public --source=. --remote=origin`.
   Si ya existe un remoto o repositorio, verificarlo en lugar de recrearlo.
5. Ejecutar `git push -u origin master`.
6. En GitHub, abrir el repositorio → Settings → Pages → Build and deployment →
   Source: **GitHub Actions**. No elegir publicación desde una rama.
7. En Actions, seleccionar **Validate and deploy demo** → **Run workflow**, rama
   `master`. El primer intento automático puede fallar si Pages aún no estaba
   habilitado; ejecutar de nuevo después del paso anterior.
8. Esperar a que los trabajos `build` y `deploy` estén verdes. Abrir la URL del
   entorno `github-pages`, comprobar imágenes, navegación y WhatsApp en un móvil.
   No confundir un push exitoso con un despliegue exitoso.

## Publicaciones siguientes

Cada push a `master` valida formato, lint, tipos, pruebas unitarias, build y E2E
con accesibilidad en escritorio y móvil antes de publicar. No se despliega si
falla una comprobación. Se sube solo `dist`; la maqueta obsoleta `dist/propuesta`
se excluye del artefacto, aunque su fuente permanece en el repositorio público.

`SITE_URL` y `SITE_BASE_PATH` vienen de Pages en el workflow. Sin estas variables,
el desarrollo local sigue en `/`. Las imágenes usan `BASE_URL` para funcionar en
subdirectorios. Si cambia la rama principal, actualizar el disparador del workflow.

## Pendiente antes de producción

- Aprobación de contenido, fotos, identidad y propuesta por parte del cliente.
- Sustituir contactos temporales y probar el destino real.
- Conectar el formulario a un servicio de envío con protección contra abuso;
  GitHub Pages no ejecuta un backend de correo.
- Decidir dominio y hosting definitivo; retirar `noindex` solo al lanzar.

## Referencias

- [Astro en GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
