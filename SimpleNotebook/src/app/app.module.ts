import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
@NgModule({
    declarations: [],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json?x=' + Math.random()),
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        }),
    ],
    providers: [],
    bootstrap: []
})
export class AppModule {}
