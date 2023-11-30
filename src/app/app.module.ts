import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { NavigationModule } from '@shared/navigation';
import { JwtInterceptor } from '@shared/auth/interceptors';
import { FooterModule } from '@shared/footer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationService } from '@shared/translation/services';
import { ToastrModule } from 'ngx-toastr';
import { NotificationInterceptor } from '@shared/notification/interceptors';
import { NotificationService } from '@shared/notification/services';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';

const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavigationModule,
    FooterModule,
    AgGridModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DatePipe,
    TranslationService,
    NotificationService,
    provideEnvironmentNgxMask(maskConfig),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
