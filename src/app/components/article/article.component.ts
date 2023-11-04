import { Observable, of } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArticlesService } from '@services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnChanges {
  @Input() articleId: string = '';
  content$: Observable<string> = of('');

  constructor(private articlesService: ArticlesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const articleChange = changes['articleId'];

    if (articleChange && articleChange.currentValue !== articleChange.previousValue) {
      const id = articleChange.currentValue;

      this.content$ = this.articlesService.loadArticle(id);
    }
  }
}
