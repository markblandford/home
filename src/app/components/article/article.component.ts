import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ArticlesService } from '@services/articles.service';
import { MetaService } from '@services/meta.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        MarkdownComponent,
    ]
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
