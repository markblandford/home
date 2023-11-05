import { Observable, of } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArticlesService } from '@services/articles.service';
import { MetaService } from '@services/meta.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnChanges {
  @Input() articleId: string = '';
  content$: Observable<string> = of('');

  constructor(
    private articlesService: ArticlesService,
    private metaService: MetaService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const articleChange = changes['articleId'];

    if (articleChange && articleChange.currentValue !== articleChange.previousValue) {
      const id = articleChange.currentValue;

      this.metaService.setTagsForArticlePage(id);

      this.content$ = this.articlesService.loadArticle(id);
    }
  }
}
