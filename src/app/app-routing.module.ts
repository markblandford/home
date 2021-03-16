import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  A11yComponent,
  HomeComponent
} from './pages';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: [ { title: 'Blandford.dev' } ] },
  { path: 'accessibility', component: A11yComponent, data: [ { title: 'A11y' } ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
