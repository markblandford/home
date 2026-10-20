import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ArticleSummary } from '../../models/article-summary';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterLink,
    ]
})
export class ArticleCardComponent {
  @Input() summary: ArticleSummary = {} as ArticleSummary;
}
