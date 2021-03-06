import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { InputModule } from './../input/input.module';
import { DatepickerComponent } from './datepicker.component';
import { ErrorMessageModule } from '../error-message';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [CommonModule, SharedModule, InputModule, ErrorMessageModule],
  exports: [DatepickerComponent],
  providers: [DatePipe],
})
export class DatepickerModule {}
