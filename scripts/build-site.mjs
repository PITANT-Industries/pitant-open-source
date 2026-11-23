import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';

const root = new URL('../', import.meta.url);
const destination = new URL('_site/', root);
const sources = [
  { source: 'site/', destination: '', marker: 'PITANT Open Source' },
  { source: '.sources/charts/dist/', destination: 'charts/', marker: 'PITANT Charts' },
  { source: '.sources/file-icons/_site/', destination: 'file-icons/', marker: 'PITANT File Format Icons', exclude: ['robots.txt', 'sitemap.xml'] },
];

for (const item of sources) {
  const index = await readFile(new URL(`${item.source}index.html`, root), 'utf8');
  if (!index.includes(item.marker)) throw new Error(`Unexpected index.html in ${item.source}`);
}

await rm(destination, { recursive: true, force: true });
for (const item of sources) {
  await cp(new URL(item.source, root), new URL(item.destination, destination), {
    recursive: true,
    filter: (path) => !item.exclude?.includes(basename(path)),
  });
}

const chartCatalog = new URL('.sources/charts/apps/chart-catalog/', root);
await cp(new URL('THIRD_PARTY_NOTICES.md', chartCatalog), new URL('charts/THIRD_PARTY_NOTICES.md', destination));
await cp(new URL('licenses/', chartCatalog), new URL('charts/licenses/', destination), { recursive: true });
await writeFile(new URL('.nojekyll', destination), '');
console.log('Built PITANT Open Source with /charts/ and /file-icons/.');
