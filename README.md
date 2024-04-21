# Home

[![Netlify Status](https://api.netlify.com/api/v1/badges/b22b9fef-dc15-42e1-961f-feaa2237a8d6/deploy-status)](https://app.netlify.com/sites/frosty-kare-1ab3b1/deploys)

## Development server

This is my home site where I will showcase some of my work and hopefully cover topics such as

* App security
* Web application accessibility

## Building

This site uses Angular Pre-rendering with dynamic routing.

### Routing

If a new route is added or an existing modified, run the `npm run prerender` command. This will update the [routes.txt](./routes.txt) with the updated routes.
This is used by the pre-renderer for the parameterised routes.

### SEO

For the parameterised routes, the `MetaService` combined with the [article-list.ts](./src/app/content/article-list.ts) to set various `meta` tags.
