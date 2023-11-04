import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { ArticleSummary } from '../models/article-summary';

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

  public getArticleSummaries(): Observable<Array<ArticleSummary>> {
    return this.http.get<Array<ArticleSummary>>(`${ArticlesService.articlesLocation}summaries.json`, { responseType: 'json' });
  }

  public getArticleSummary(articleId: string): Observable<ArticleSummary | undefined> {
    return this.getArticleSummaries()
      .pipe(
        map(as => as.find(({ id }) => id === articleId))
      );
  }

  constructor(
    private readonly http: HttpClient,
  ) { }
}
