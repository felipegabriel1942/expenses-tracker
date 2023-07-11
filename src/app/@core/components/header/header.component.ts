import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  isMobile: boolean;

  constructor(
    private readonly route: Router,
    private readonly deviceDetectorService: DeviceDetectorService
  ) {}

  public ngOnInit(): void {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.items = [
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      },
    ];
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    this.route.navigateByUrl('/');
  }

  public get canShow(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
