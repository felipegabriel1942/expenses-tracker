import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private readonly messageService: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          return throwError('Server connection error.');
        }

        if (error.status === 403 && this.userIsLogged()) {
          return throwError(
            'You do not have permission to perform this action.'
          );
        } else if (error.status === 403) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'E-mail ou password invalidos.',
          });
          return throwError('E-mail ou password invalidos.');
        } else {
          return throwError(error);
        }
      })
    );
  }

  userIsLogged(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
