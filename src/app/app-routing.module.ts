import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ArticlesComponent,
  HomeComponent
} from './pages';

const routes: Routes = [
  { path: 'home', component: HomeComponent, redirectTo: 'articles', data: [ { title: 'Blandford.dev' } ] },
  { path: 'articles', component: ArticlesComponent, data: [ { title: 'Blandford.dev' } ] },
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: '**', redirectTo: '/articles', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
