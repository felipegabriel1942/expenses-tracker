import { AbstractControl } from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DatepickerInterface } from './interfaces/datepicker.interface';

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

  public formatDateOnFocusLost(isFocused: boolean): void {
    if (
      !isFocused &&
      typeof this.control.value === 'string' &&
      this.control.value != null &&
      this.control.value !== ''
    ) {
      this.control.setValue(this.convertStringToDate(this.control.value));
      this.setFormattedDate(this.control.value);
    }
  }

  private setFormattedDate(value: string | Date): void {
    if (typeof value === 'string') {
      this.formattedDate = this.convertDateToString(
        this.convertStringToDate(value)
      );
    } else {
      this.formattedDate = this.convertDateToString(value);
    }

    this.changeDetection.detectChanges();
  }

  private convertStringToDate(value: string): Date {
    let day, month, year;

    if (value.includes('/')) {
      day = value.substring(0, 2);
      month = value.substring(3, 5);
      year = value.substring(6, 10);
    } else if (!value.includes('/') && value.length === 8) {
      day = value.substring(0, 2);
      month = value.substring(2, 4);
      year = value.substring(4, 8);
    }

    return new Date(+year, +month - 1, +day);
  }

  private convertDateToString(value?: Date): string {
    if (value == null) {
      return;
    }

    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();

    const month =
      value.getMonth() + 1 < 10
        ? `0${value.getMonth() + 1}`
        : value.getMonth() + 1;

    return `${day}/${month}/${value.getFullYear()}`;
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
