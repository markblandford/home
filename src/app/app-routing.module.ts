import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ArticlesComponent,
  HomeComponent,
  RenderArticleComponent
} from './pages';

const routes: Routes = [
  { path: 'articles', title: 'Blandford.dev - articles', component: ArticlesComponent, data: [ { heading: 'Articles' } ] },
  { path: 'articles/:id', component: RenderArticleComponent },
  { path: '', title: 'Blandford.dev - home', component: HomeComponent, data: [ { heading: 'Blandford.dev' } ] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
