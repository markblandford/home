import { Component, Input } from '@angular/core';
import { ArticleSummary } from '../../models/article-summary';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: [ './article-card.component.scss' ],
  imports: [
    CommonModule,
    RouterLink,
  ],
  standalone: true
})
export class ArticleCardComponent {
  @Input() summary: ArticleSummary = {} as ArticleSummary;
}
