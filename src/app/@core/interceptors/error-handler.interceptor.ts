import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      if (error.error.errors) {
        const errors = error.error.errors as string[];

        errors.forEach((e) => {
          this.zone.run(() => console.log(e));
        });
      }
    } else {
      this.zone.run(() => console.log(error.toString()));
    }
  }
}
