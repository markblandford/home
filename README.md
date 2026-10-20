# Home

[![Netlify Status](https://api.netlify.com/api/v1/badges/b22b9fef-dc15-42e1-961f-feaa2237a8d6/deploy-status)](https://app.netlify.com/sites/frosty-kare-1ab3b1/deploys)

This is my home site where I will showcase some of my work and hopefully cover topics such as

* App security
* Web application accessibility

## Running locally

### Prerequisites

* Node 24 (see [.nvmrc](./.nvmrc)). With nvm, run `nvm use` in the project root.
* npm

### Install

```bash
npm ci
```

### Development server

```bash
npm start
```

This builds the articles (see [Articles](#articles)) and then runs `ng serve`. The site is available at <http://localhost:4200>.

When writing an article, run the article watcher in a second terminal so each `article.md` is rebuilt when you save it:

```bash
npm run watch:articles
```

The dev server picks up the regenerated HTML. Refresh the page to see the change.

### Useful scripts

| Script                   | Description                                                            |
|--------------------------|------------------------------------------------------------------------|
| `npm start`              | Build the articles and start the dev server.                           |
| `npm run build:articles` | Convert every `article.md` into `article.html`.                        |
| `npm run watch:articles` | Build the articles, then rebuild any article whose markdown changes.   |
| `npm run build`          | Build the articles and the app (development configuration).            |
| `npm run prerender`      | Build the articles and the prerendered production site (Netlify).      |
| `npm test` / `test:ci`   | Run the Jest unit tests (watch / single run).                          |
| `npm run cy:run-all`     | Start the dev server and run the Cypress tests against it.             |
| `npm run lint`           | Lint the TypeScript and templates.                                     |
| `npm run stylelint`      | Lint the SCSS.                                                         |

## Articles

Articles are written in Markdown and converted to HTML **at build time**, so the browser never downloads a markdown parser, syntax highlighter or emoji library.

### Adding an article

1. Create a folder under [src/assets/articles](./src/assets/articles) named after the article ID, e.g. `src/assets/articles/my-new-article/`.
2. Write the content in `article.md` in that folder.
3. Add a summary for the article to [article-list.ts](./src/app/content/article-list.ts). This drives the article list, the prerendered routes and the meta tags.
4. Run `npm run build:articles`, or keep `npm run watch:articles` running.

### How the articles are built

[build-articles.mts](./build-articles.mts) reads each `src/assets/articles/<id>/article.md` and writes `article.html` next to it. It runs with Node's built-in TypeScript support, so no compile step is needed.

* Markdown is parsed with [marked](https://marked.js.org/), using GitHub-flavoured markdown with line breaks preserved.
* Fenced code blocks are highlighted with [Prism](https://prismjs.com/). Set the language on the fence, e.g. ` ```typescript ` or ` ```java `. Prism loads the language grammar on demand. The colours come from the Prism Solarized Light theme in `angular.json`.
* Emoji shortcodes such as `:green_circle:` are converted to unicode with [emoji-toolkit](https://github.com/joypixels/emoji-toolkit).

The generated `article.html` files are git-ignored and excluded from ESLint. The `article.md` sources are not copied into the build output. `ArticleComponent` fetches the HTML through `ArticlesService` and binds it with `[innerHTML]`, so Angular's sanitiser still applies.

## Building

This site uses Angular Pre-rendering with dynamic routing.

Run `npm run prerender` to produce the static site in `dist/home/browser`.

### Routing

Every route is pre-rendered. The parameterised `articles/:id` routes are generated at build time from [article-list.ts](./src/app/content/article-list.ts)
by `getPrerenderParams` in [app.routes.server.ts](./src/app/app.routes.server.ts), so a new article only needs its `article.md` and an entry in the list.

### SEO

For the parameterised routes, the `MetaService` combined with the [article-list.ts](./src/app/content/article-list.ts) to set various `meta` tags.

## Pre-deploy checks

Pushing to `main` runs `npm run pre-deploy` from the husky `pre-push` hook (Snyk, ESLint, stylelint, Jest and Cypress), and a failure blocks the push.

The Snyk CLI is a dev dependency. Authenticate once with `npx snyk auth`, or export a `SNYK_TOKEN`, before pushing to `main`.
