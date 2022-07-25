import { SnackbarInterface } from './interfaces/snackbar.interface';
import { SnackbarService } from './snackbar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarType } from './enums/snackbar-type.enum';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  public snackbar: SnackbarInterface;
  public snackbarTypeEnum = SnackbarType;

  constructor(private readonly snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.listenSnackbarEvents();
  }

  ngOnDestroy(): void {
    this.snackbarService.snackbarSubject.unsubscribe();
  }

  listenSnackbarEvents(): void {
    this.snackbarService.snackbarSubject.subscribe((value) => {
      this.snackbar = value;

      if (this.snackbar.isShowing) {
        setTimeout(() => {
          this.snackbarService.hide();
        }, this.snackbar.duration);
      }
    });
  }

  close(): void {
    this.snackbarService.hide();
  }
}
