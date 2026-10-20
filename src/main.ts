import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { browserTracingIntegration, init } from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

init({
  dsn: 'https://36e2e5d5b38b4d52b2056ea49bf895c4@o544339.ingest.sentry.io/5665484',
  integrations: [
    browserTracingIntegration(),
  ],
  tracePropagationTargets: [ 'https://blandford.dev' ],
  tracesSampleRate: 1,
});

if (environment.production) {
  enableProdMode();
}

platformBrowser().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
  .catch(err => console.error(err));
