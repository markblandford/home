import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesService } from '@services/articles.service';

import { ArticleSummary } from '../../models/article-summary';
import { ArticleCardComponent } from '@components/article-card/article-card.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: [ './article-list.component.scss' ],
  standalone: true,
  imports: [
    ArticleCardComponent,
    CommonModule
  ]
})
export class ArticleListComponent implements OnInit {
  articleSummaries: Array<ArticleSummary> = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articleSummaries = this.articlesService.getArticleSummaries();
  }
}
