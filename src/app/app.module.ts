import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { createErrorHandler, TraceService } from '@sentry/angular-ivy';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ArticleCardComponent,
  ArticleComponent,
  ArticleListComponent,
  BioComponent,
  FooterComponent,
  HeaderComponent,
  NavigationComponent,

} from './components';
import {
  ArticlesComponent,
  HomeComponent,
  RenderArticleComponent
} from './pages';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    ArticleComponent,
    BioComponent,
    RenderArticleComponent,
    ArticleCardComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
        },
      },
    }),
  ],
  providers: [
    provideClientHydration(),
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
