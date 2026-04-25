# danbennett.me

Static personal site for [danbennett.me](https://www.danbennett.me), now structured as an [Eleventy](https://www.11ty.dev/) site.

The old Jekyll/Ruby setup has been removed. Source content lives in `content/`, shared templates live in `_includes/`, site data lives in `_data/`, and Eleventy builds the deployable site into `_site/`.

## Editing

- Home page: `content/index.njk`
- About page: `content/about.md`
- CV page: `content/cv.njk`
- Blog/project entries: `content/posts/`
- Site settings and nav: `_data/site.js`
- CV content: `_data/cv.js`
- Layouts and shared snippets: `_includes/`
- CSS: `src/styles/site.css`

Project records are kept as Markdown entries with `projects: true` and `permalink: false`, so they appear on `/projects/` without generating standalone pages.

## Local Setup

This project expects Node.js with npm.

```sh
npm install
npm run build
npm run serve
```

Then open `http://localhost:4000`.

## Deploy

GitHub Pages deployment is configured in `.github/workflows/pages.yml`. The workflow installs dependencies, runs Eleventy, uploads `_site/`, and deploys that artifact to GitHub Pages.

In the repository settings, Pages should use **GitHub Actions** as its source.

## Legacy Preview

The root-level generated HTML files are still present during this migration branch so the current preview remains usable without npm. Once the 11ty build is verified, those generated files can be removed and `_site/` can become the only deploy artifact.
