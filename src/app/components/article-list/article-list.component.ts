import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '@services/articles.service';
import { Observable, of } from 'rxjs';
import { ArticleSummary } from '../../models/article-summary';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articleSummaries$: Observable<Array<ArticleSummary>> = of();

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articleSummaries$ = this.articlesService.getArticleSummaries();
  }
}
