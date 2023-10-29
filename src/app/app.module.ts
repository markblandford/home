import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { createErrorHandler, TraceService } from '@sentry/angular-ivy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components';
import {
  ArticlesComponent,
  HomeComponent
} from './pages';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './components/article/article.component';
import { BioComponent } from './components/bio/bio.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    ArticleComponent,
    BioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
