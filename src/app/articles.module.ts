import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderArticleComponent } from '@pages/render-article/render-article.component';
import { MarkdownModule, MARKED_OPTIONS } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { ArticleComponent } from '@components/article/article.component';
import { ArticlesComponent } from '@pages/articles/articles.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from '@components/article-list/article-list.component';

const articlesRoutes: Routes = [
  { path: '', title: 'Blandford.dev - articles', component: ArticlesComponent, data: [ { heading: 'Articles' } ] },
  { path: ':id', component: RenderArticleComponent },
];

@NgModule({
  declarations: [
    ArticlesComponent,
    RenderArticleComponent
  ],
  imports: [
    ArticleListComponent,
    CommonModule,
    RouterModule.forChild(articlesRoutes),
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
        },
      },
    }),
    ArticleComponent,
  ],
  exports: [
    ArticlesComponent,
    RenderArticleComponent
  ]
})
export class ArticlesModule { }
