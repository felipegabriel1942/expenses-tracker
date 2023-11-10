import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PanelModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
