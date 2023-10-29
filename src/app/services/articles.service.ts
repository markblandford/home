import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  public articlesLocation(): string {
    return '/assets/articles/';
  }

  public loadArticle(filename: string): Observable<string> {
    console.log('filename: ', filename)
    return this.http.get(filename, { responseType: 'text' });
  }

  constructor(
    private readonly http: HttpClient,
  ) { }
}
