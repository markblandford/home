import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderArticleComponent } from '@pages/render-article/render-article.component';
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
    ArticleComponent,
  ],
  exports: [
    ArticlesComponent,
    RenderArticleComponent
  ]
})
export class ArticlesModule { }
