import { cp, readFile, rm, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const destination = new URL('_site/', root);
const sources = [
  { source: 'site/', destination: '', marker: 'PITANT Open Source' },
  { source: '.sources/charts/dist/', destination: 'charts/', marker: 'type="module"' },
  { source: '.sources/file-icons/_site/', destination: 'file-icons/', marker: 'PITANT File Format Icons' },
];

for (const item of sources) {
  const index = await readFile(new URL(`${item.source}index.html`, root), 'utf8');
  if (!index.includes(item.marker)) throw new Error(`Unexpected index.html in ${item.source}`);
}

await rm(destination, { recursive: true, force: true });
for (const item of sources) {
  await cp(new URL(item.source, root), new URL(item.destination, destination), { recursive: true });
}

const chartIndex = new URL('charts/index.html', destination);
const chartPage = await readFile(chartIndex, 'utf8');
await writeFile(chartIndex, chartPage
  .replace(/<title>[^<]+<\/title>/u, '<title>PITANT Charts</title>')
  .replace(/<link rel="icon"[^>]+>/u, '<link rel="icon" type="image/svg+xml" href="../brand/pitant-favicon.svg">'));

const chartCatalog = new URL('.sources/charts/apps/chart-catalog/', root);
await cp(new URL('THIRD_PARTY_NOTICES.md', chartCatalog), new URL('charts/THIRD_PARTY_NOTICES.md', destination));
await cp(new URL('licenses/', chartCatalog), new URL('charts/licenses/', destination), { recursive: true });
await writeFile(new URL('.nojekyll', destination), '');
console.log('Built PITANT Open Source with /charts/ and /file-icons/.');
