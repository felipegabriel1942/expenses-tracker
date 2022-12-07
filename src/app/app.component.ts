import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isMobile = false;

  constructor(private devideDetector: DeviceDetectorService) {}


  ngOnInit(): void {
    this.isMobile = this.devideDetector.isMobile();
  }


}
