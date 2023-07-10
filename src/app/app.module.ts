import { CoreModule } from './@core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { NgxSpinnerModule } from "ngx-spinner";

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    CoreModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
})
export class AppModule {}
