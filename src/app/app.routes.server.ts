import { RenderMode, ServerRoute } from '@angular/ssr';

import ArticleList from '@content/article-list';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => new ArticleList().getSummaries().map(({ id }) => ({ id })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
