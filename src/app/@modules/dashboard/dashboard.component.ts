import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DashboardService } from '@services/dashboard/dashboard.service';
import { SubscriptionService } from '@services/subscription/subscription.service';
import { Dashboard } from '@models/dashboard.model';
import { DateUtil } from '@utils/date.util';
import { DateFormat } from '@enums/date-format.enum';
import { IC_EXPENSE, IC_PROFITS, IC_SALARY } from '@consts/assets';
import { ApiResponse } from '@models/api-reponse.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public icons = this.createIcons();
  public dashboard: Dashboard = new Dashboard();
  public form = this.createForm();

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.getDashboard();
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll();
  }

  public getDashboard(): void {
    const subscription = this.dashboardService
      .getDashboard(this.period)
      .subscribe({
        next: (res: ApiResponse<Dashboard>) => {
          this.dashboard = res.content;
        },
      });

    this.subscriptionService.add(subscription);
  }

  private get period() {
    return DateUtil.formatDate(
      this.form.get('period').value as Date,
      DateFormat.YYYY_MM
    );
  }

  private createForm(): FormGroup {
    return new FormGroup({
      period: new FormControl(new Date()),
    });
  }

  private createIcons() {
    return {
      expense: IC_EXPENSE,
      revenue: IC_PROFITS,
      result: IC_SALARY,
    };
  }
}
