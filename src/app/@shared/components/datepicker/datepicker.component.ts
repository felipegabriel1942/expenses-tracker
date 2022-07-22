import { AbstractControl } from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DatepickerInterface } from './interfaces/datepicker.interface';
import { DateUtils } from 'src/app/utils';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @Input() public options: DatepickerInterface;

  public isFocused = false;
  public formattedDate = '';

  constructor(private readonly changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setFormattedDate(this.control.value);
  }

  public onDateSelected(date: Date): void {
    this.isFocused = !this.isFocused;
    this.control.setValue(date);
    this.setFormattedDate(date);
  }

  public onFocusLost(isFocused: boolean): void {
    if (
      !isFocused &&
      typeof this.control.value === 'string' &&
      this.control.value != null &&
      this.control.value !== ''
    ) {
      const date = DateUtils.convertStringToDate(this.control.value);

      if (date && !this.control.errors) {
        this.control.setValue(date);
        this.setFormattedDate(this.control.value);
      } else {
        this.control.setValue('Invalid Date');

        this.control.setErrors({ invalidDate: true });
      }
    }
  }

  private setFormattedDate(value: string | Date): void {
    if (typeof value === 'string') {
      value = DateUtils.convertStringToDate(value);
    }

    this.formattedDate = DateUtils.convertDateToString(value);

    this.changeDetection.detectChanges();
  }

  public get isDisabled(): boolean {
    return this.options.control.disabled;
  }

  public get isInvalid(): boolean {
    return this.options.control.invalid && this.options.control.touched;
  }

  public get control(): AbstractControl {
    return this.options.control;
  }

  public get selectedDate(): Date {
    return this.control.value;
  }

  public get selectedMonth(): number {
    return this.selectedDate
      ? this.selectedDate.getMonth()
      : new Date().getMonth();
  }

  public get selectedYear(): number {
    return this.selectedDate
      ? this.selectedDate.getFullYear()
      : new Date().getFullYear();
  }
}
