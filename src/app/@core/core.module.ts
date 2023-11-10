import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { MessageInterceptor } from './interceptors/message.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';

@NgModule({
  imports: [CommonModule, TieredMenuModule, ButtonModule, AvatarModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerInterceptor },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
