# Home

[![Netlify Status](https://api.netlify.com/api/v1/badges/b22b9fef-dc15-42e1-961f-feaa2237a8d6/deploy-status)](https://app.netlify.com/sites/frosty-kare-1ab3b1/deploys)

## Development server

This is my home site where I will showcase some of my work and hopefully cover topics such as

* App security
* Web application accessibility

## Building

This site uses Angular Pre-rendering with dynamic routing.

Requires Node 24 (see [.nvmrc](./.nvmrc)). Run `npm run prerender` to produce the static site in `dist/home/browser`.

### Routing

Every route is pre-rendered. The parameterised `articles/:id` routes are generated at build time from [article-list.ts](./src/app/content/article-list.ts)
by `getPrerenderParams` in [app.routes.server.ts](./src/app/app.routes.server.ts), so adding an article to the list is enough.

### SEO

For the parameterised routes, the `MetaService` combined with the [article-list.ts](./src/app/content/article-list.ts) to set various `meta` tags.

## Pre-deploy checks

Pushing to `main` runs `npm run pre-deploy` from the husky `pre-push` hook (Snyk, ESLint, stylelint, Jest and Cypress), and a failure blocks the push.

The Snyk CLI is a dev dependency. Authenticate once with `npx snyk auth`, or export a `SNYK_TOKEN`, before pushing to `main`.
