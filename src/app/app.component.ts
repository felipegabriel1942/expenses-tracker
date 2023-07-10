import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './@services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isMobile = false;

  constructor(
    private readonly devideDetector: DeviceDetectorService,
    private readonly spinner: NgxSpinnerService,
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isMobile = this.devideDetector.isMobile();

    this.loadingService.getLoading().subscribe((loading) => {
      if (this.router.url == '/') {
        loading ? this.spinner.show() : this.spinner.hide();
      }
    });
  }
}
