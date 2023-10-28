import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ArticlesComponent,
  HomeComponent
} from './pages';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: [ { title: 'Blandford.dev' } ] },
  { path: 'articles', component: ArticlesComponent, data: [ { title: 'Articles' } ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
