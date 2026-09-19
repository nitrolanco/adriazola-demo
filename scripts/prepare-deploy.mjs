import { lstat, realpath, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const target = join(output, 'propuesta');
const realRoot = await realpath(root);
if ((await realpath(output)) !== join(realRoot, 'dist')) {
  throw new Error('El directorio de salida está fuera del proyecto.');
}
const entry = await lstat(target).catch((error) => {
  if (error.code === 'ENOENT') return null;
  throw error;
});
if (entry) {
  if (
    entry.isSymbolicLink() ||
    (await realpath(target)) !== join(realRoot, 'dist', 'propuesta')
  ) {
    throw new Error('La ruta del prototipo no es el directorio esperado.');
  }
  await rm(target, { recursive: true });
}
