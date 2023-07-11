import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { MessageInterceptor } from './interceptors/message.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';

@NgModule({
  imports: [CommonModule, TieredMenuModule, ButtonModule, AvatarModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
})
export class CoreModule {}
