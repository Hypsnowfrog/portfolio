import { execFileSync } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const worksDir = resolve(root, 'src/content/works');
const statuses = new Set(['Disponible', 'Vendu', 'Collection privée', 'Non disponible']);

const fieldPattern = (name) => new RegExp(`^${name}:.*(?:\\r?\\n|$)`, 'm');
const getField = (source, name) => source.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'))?.[1]?.trim();

function setField(source, name, value) {
  const line = `${name}: ${value}\n`;
  return fieldPattern(name).test(source)
    ? source.replace(fieldPattern(name), line)
    : source.replace(/^---\r?\n/, (header) => `${header}${line}`);
}

function removeField(source, name) {
  return source.replace(fieldPattern(name), '');
}

function legacyCreatedAt(file) {
  const date = execFileSync('git', ['log', '--diff-filter=A', '--format=%cI', '--', file], {
    cwd: root,
    encoding: 'utf8',
  }).trim().split('\n')[0];
  if (!date) throw new Error(`${file}: created_at is required when Git creation history is unavailable`);
  return date;
}

function createdAt(source, file) {
  const value = getField(source, 'created_at')?.replace(/^['"]|['"]$/g, '');
  return value && !Number.isNaN(Date.parse(value)) ? value : legacyCreatedAt(file);
}

async function sync(file) {
  const original = await readFile(file, 'utf8');
  const image = getField(original, 'image')?.replace(/^['"]|['"]$/g, '');
  if (!image?.startsWith('/uploads/')) throw new Error(`${file}: image must reference /uploads/`);

  const imageFile = resolve(root, 'public', image.slice(1));
  const { width, height } = await sharp(imageFile).metadata();
  if (!width || !height) throw new Error(`${file}: unreadable image dimensions`);

  let updated = setField(original, 'image_width', width);
  updated = setField(updated, 'image_height', height);
  updated = setField(updated, 'created_at', createdAt(updated, file));
  if (!statuses.has(getField(updated, 'status')?.replace(/^['"]|['"]$/g, ''))) {
    updated = setField(updated, 'status', getField(original, 'available') === 'true' ? 'Disponible' : 'Non disponible');
  }
  updated = removeField(removeField(updated, 'order'), 'available');

  if (updated !== original) await writeFile(file, updated);
  return updated !== original;
}

const files = (await readdir(worksDir)).filter((file) => file.endsWith('.md')).map((file) => resolve(worksDir, file));
const changed = (await Promise.all(files.map(sync))).filter(Boolean).length;
console.log(`Artwork metadata: ${files.length} checked, ${changed} updated.`);
