import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) {}

  public ngOnInit(): void {}

  public logout(): void {
    sessionStorage.removeItem('token');
    this.route.navigateByUrl('/');
  }

  public get canShow(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
