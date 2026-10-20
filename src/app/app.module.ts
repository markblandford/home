import { ErrorHandler, inject, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule, provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { createErrorHandler, TraceService } from '@sentry/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ArticleListComponent,
  BioComponent,
  FooterComponent,
  HeaderComponent,
  NavigationComponent,
} from './components';
import {
  HomeComponent,
} from './pages';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    BioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ArticleListComponent,
  ],
  providers: [
    provideClientHydration(withNoIncrementalHydration()),
    provideHttpClient(),
    {
      provide: ErrorHandler,
      useValue: createErrorHandler({
        showDialog: false,
      }),
    },
    provideAppInitializer(() => {
      inject(TraceService);
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
