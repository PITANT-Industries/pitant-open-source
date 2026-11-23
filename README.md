# PITANT Open Source

The shared site for PITANT’s public developer projects. [Browse the project hub](https://opensource.pitant.de/).

| Project | Site | Source |
| --- | --- | --- |
| PITANT Charts | [Chart catalog](https://opensource.pitant.de/charts/) | [PITANT-Industries/pitant-charts](https://github.com/PITANT-Industries/pitant-charts) |
| PITANT File Icons | [File-format icon catalog](https://opensource.pitant.de/file-icons/) | [PITANT-Industries/pitant-file-icons](https://github.com/PITANT-Industries/pitant-file-icons) |

The Pages workflow builds both catalogs from pinned revisions of their public repositories and serves them alongside the hub. The existing source repositories continue to own their packages and release history. The deployed Charts catalog includes its notices and licenses. The File Icons catalog includes its MIT license.

## Update a catalog

Update the corresponding public commit in [the Pages workflow](.github/workflows/pages.yml). Run the build with the new commit and check both project paths. Push to `main` to publish through GitHub Pages, or run the workflow manually. This project site has its own custom domain.

## Build locally

Use Node 24 and Bun 1.4.4. Check out the two pinned public revisions from the workflow into `.sources/charts` and `.sources/file-icons`. Run the same commands as the workflow.

```sh
(cd .sources/charts && bun install --frozen-lockfile && bun run catalog:site)
(cd .sources/file-icons && npm ci && npm run build:site)
node scripts/build-site.mjs
python3 -m http.server 8000 --directory _site
```

The hub code is licensed under the [MIT License](LICENSE). PITANT brand marks identify the publisher. See the respective project repositories for the licenses and notices that apply to their code and assets.
