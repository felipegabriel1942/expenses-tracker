import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/@services/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true);

    return next
      .handle(req)
      .pipe(
        catchError((error) => {
          this.loadingService.setLoading(false);
          return error;
        })
      )
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.loadingService.setLoading(false);
          }

          return event;
        })
      );
  }
}
