import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { init, instrumentAngularRouting, BrowserTracing } from '@sentry/angular-ivy';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

init({
  dsn: 'https://36e2e5d5b38b4d52b2056ea49bf895c4@o544339.ingest.sentry.io/5665484',
  integrations: [
    new BrowserTracing({
      tracingOrigins: [ 'https://blandford.dev' ],
      routingInstrumentation: instrumentAngularRouting,
    }),
  ],
  tracesSampleRate: 1,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
