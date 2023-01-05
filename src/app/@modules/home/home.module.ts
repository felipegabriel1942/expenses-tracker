import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { BadgeModule } from 'primeng/badge';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';

import { HomeRoutingModule } from './home-routing.module';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { HomeComponent } from './home.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionSummaryComponent } from './components/transaction-summary/transaction-summary.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
@NgModule({
  declarations: [
    HomeComponent,
    TransactionListComponent,
    TransactionFormComponent,
    TransactionSummaryComponent,
    TransactionChartComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
    InputNumberModule,
    InputNumberModule,
    ToastModule,
    ChartModule,
    BadgeModule,
    SelectButtonModule,
    RadioButtonModule
  ],
})
export class HomeModule {}
