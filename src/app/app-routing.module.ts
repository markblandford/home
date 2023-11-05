import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ArticlesComponent,
  HomeComponent,
  RenderArticleComponent
} from './pages';

const routes: Routes = [
  { path: 'home', title: 'Blandford.dev - home', component: HomeComponent, data: [ { heading: 'Blandford.dev' } ] },
  { path: 'articles', title: 'Blandford.dev - articles', component: ArticlesComponent, data: [ { heading: 'Articles' } ] },
  { path: 'article/:id', component: RenderArticleComponent, data: [ { isArticle: true } ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
