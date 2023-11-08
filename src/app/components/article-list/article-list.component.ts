import { Component, OnInit } from '@angular/core';

import { ArticlesService } from '@services/articles.service';

import { ArticleSummary } from '../../models/article-summary';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articleSummaries: Array<ArticleSummary> = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articleSummaries = this.articlesService.getArticleSummaries();
  }
}
