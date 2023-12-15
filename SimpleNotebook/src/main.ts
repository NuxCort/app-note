import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(HttpClientModule),
      importProvidersFrom(TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json?x=' + Math.random()),
              deps: [HttpClient]
         },
         defaultLanguage: 'en'
      }),
  ),
  importProvidersFrom(BrowserAnimationsModule),
]
});
