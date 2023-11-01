import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ArticlesComponent,
  HomeComponent,
  RenderArticleComponent
} from './pages';


const routes: Routes = [
  { path: 'home', title: 'Blandford.dev - home', component: HomeComponent, data: [ { title: 'Blandford.dev' } ] },
  { path: 'articles', title: 'Blandford.dev - articles', component: ArticlesComponent, data: [ { title: 'Articles' } ] },
  { path: 'article/:id', title: 'Blandford.dev - article', component: RenderArticleComponent, data: [ { title: 'Article' } ] },
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
