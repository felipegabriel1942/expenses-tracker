import { SnackbarInterface } from './interfaces/snackbar.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarType } from './enums/snackbar-type.enum';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public snackbarSubject = new Subject<SnackbarInterface>();

  constructor() {}

  public show(config: SnackbarInterface): void {
    config.isShowing = true;
    config.duration = config.duration == null ? 3000 : config.duration;

    this.snackbarSubject.next(config);
  }

  public hide(): void {
    this.snackbarSubject.next({
      isShowing: false,
      type: SnackbarType.ALERT,
      message: '',
    });
  }
}
