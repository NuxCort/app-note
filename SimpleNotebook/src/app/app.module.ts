import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json?x=' + Math.random()),
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
  }),
  CommonModule,
  BrowserModule,
  HttpClientModule,
  NgbModule,
  FormsModule,

  ],
  providers: [
    HttpClient,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
