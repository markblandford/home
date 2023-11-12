import { ArticleSummary } from './src/app/models/article-summary';

import ArticleList from './src/app/content/article-list';
const { appendFile } = require('fs');

function appendRoute(route: string): void {
  appendFile('routes.txt', `${route}\n`, (err: any) => {
    if (err) {
      throw err;
    } else {
      console.log(`${route} added`);
    }
  });
}

function buildRouteList(): void {
  const articles = new ArticleList().getSummaries();

  const rootRoutes: string[] = [
    '/',
    '/articles'
  ]

  rootRoutes.forEach((r: string) => appendRoute(r));

  articles.forEach((article: ArticleSummary) => {
    const articleRoute = `/articles/${article.id}`;

    appendRoute(articleRoute);
  });
}

buildRouteList();
