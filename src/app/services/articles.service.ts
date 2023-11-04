import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ArticleSummary } from '../models/article-summary';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  public articlesLocation(): string {
    return '/assets/articles/';
  }

  public loadArticle(filename: string): Observable<string> {
    return this.http.get(filename, { responseType: 'text' });
  }

  public getArticleSummaries(): Observable<Array<ArticleSummary>> {
    return this.http.get<Array<ArticleSummary>>(`${this.articlesLocation()}summaries.json`, { responseType: 'json' });
  }

  constructor(
    private readonly http: HttpClient,
  ) { }
}
