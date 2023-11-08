import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ArticleSummary } from '../models/article-summary';
import ArticleList from '@content/article-list';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  static readonly articlesLocation = '/assets/articles/';
  static readonly articleFilename = 'article.md';

  public loadArticle(id: string): Observable<string> {
    const filename = `${ArticlesService.articlesLocation}${id}/${ArticlesService.articleFilename}`;

    return this.http.get(filename, { responseType: 'text' });
  }

  public getArticleSummaries(): Array<ArticleSummary> {
    return new ArticleList().getSummaries();
  }

  public getArticleSummary(articleId: string): ArticleSummary | undefined {
    return this.getArticleSummaries()
      .find(({ id }) => id === articleId);
  }

  constructor(
    private readonly http: HttpClient,
  ) { }
}
