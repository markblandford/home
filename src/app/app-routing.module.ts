import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'home', component: AppComponent, data: [ { title: 'Blandford.dev' } ] },
  { path: '', redirectTo: 'home', pathMatch: 'full', data: [ { title: 'Blandford.dev - Home' } ] },
  { path: '**', redirectTo: '', pathMatch: 'full', data: [ { title: 'Blandford.dev - **' } ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
