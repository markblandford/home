import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  HomeComponent,
} from './pages';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () => import('./articles.module').then(m => m.ArticlesModule)
  },
  { path: '', title: 'Blandford.dev - home', component: HomeComponent, data: [ { heading: 'Blandford.dev' } ] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore',
    initialNavigation: 'enabledBlocking',
    preloadingStrategy: PreloadAllModules,
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
