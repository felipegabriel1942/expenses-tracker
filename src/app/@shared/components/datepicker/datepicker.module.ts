import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { InputModule } from './../input/input.module';
import { DatepickerComponent } from './datepicker.component';
import { ErrorMessageModule } from '../error-message';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [DatepickerComponent, CalendarComponent],
  imports: [CommonModule, SharedModule, InputModule, ErrorMessageModule],
  exports: [DatepickerComponent],
  providers: [DatePipe],
})
export class DatepickerModule {}
