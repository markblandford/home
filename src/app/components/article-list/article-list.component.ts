import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


import { ArticlesService } from '@services/articles.service';

import { ArticleSummary } from '../../models/article-summary';
import { ArticleCardComponent } from '@components/article-card/article-card.component';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    ArticleCardComponent
]
})
export class ArticleListComponent implements OnInit {
  articleSummaries: Array<ArticleSummary> = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articleSummaries = this.articlesService.getArticleSummaries().sort((a, b) => {
      const aDate = new Date(a.updatedDate);
      const bDate = new Date(b.updatedDate);
      return bDate.getTime() - aDate.getTime();
    });
  }
}
