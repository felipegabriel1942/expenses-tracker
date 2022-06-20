import { AbstractControl } from '@angular/forms';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Months } from './enums/months.enum';
import { DatepickerInterface } from './interfaces/datepicker.interface';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @Input() public options: DatepickerInterface;

  public selectedMonth: number;
  public selectedYear: number;
  public selectedDate: Date;
  public isFocused = false;
  public formattedDate = '';

  constructor(private readonly changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setInitialData();
    this.listenControlChanges();
  }

  ngAfterViewChecked(): void {}

  private listenControlChanges(): void {
    this.control.valueChanges.subscribe((value: string) => {
      if (value === '' || value == null) {
        return;
      }

      if (typeof value === 'string') {
        this.formattedDate = value;
        this.control.setValue(new Date(this.format(value)), {
          emitEvent: false,
        });

        if (new Date(this.format(value)).toString() !== 'Invalid Date') {
          this.selectedDate = new Date(this.format(value));
        }
      }

      this.selectedMonth = this.selectedDate
        ? this.selectedDate.getMonth()
        : new Date().getMonth();

      this.selectedYear = this.selectedDate
        ? this.selectedDate.getFullYear()
        : new Date().getFullYear();
    });
  }

  private format(value: string): string {
    const splitted = value.split('/');

    if (value.includes('/')) {
      return `${splitted[1]}-${splitted[0]}-${splitted[2]}`;
    } else if (!value.includes('/') && value.length === 8) {
      return `${value.substring(2, 4)}-${value.substring(
        0,
        2
      )}-${value.substring(4, 8)}`;
    }

    return value;
  }

  private setInitialData(): void {
    if (this.control.value) {
      this.selectedDate = new Date(new Date(this.control.value).toDateString());
      this.formattedDate = this.convertDateToString(this.selectedDate);
    }

    const value = this.control.value;

    if (value === '' || value == null) {
      return;
    }

    if (typeof value === 'string') {
      this.formattedDate = value;
      this.control.setValue(new Date(this.format(value)), {
        emitEvent: false,
      });
    } else {
      this.formattedDate = this.convertDateToString(
        new Date(this.control.value)
      );
    }

    this.selectedMonth = this.selectedDate
      ? this.selectedDate.getMonth()
      : new Date().getMonth();

    this.selectedYear = this.selectedDate
      ? this.selectedDate.getFullYear()
      : new Date().getFullYear();

    this.changeDetection.detectChanges();
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

  public setDate(date: Date): void {
    this.selectedDate = date;
    this.options.control.setValue(date);
    this.setFocus(false);
  }

  public isFromSelectedMonth(date: Date): boolean {
    return (
      date.getMonth() === this.selectedMonth &&
      date.getFullYear() === this.selectedYear
    );
  }

  public isSelectedDate(date: Date): boolean {
    if (!this.selectedDate) {
      return false;
    }

    return (
      date.getFullYear() === this.selectedDate.getFullYear() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getDate() === this.selectedDate.getDate() &&
      this.selectedMonth === this.selectedDate.getMonth()
    );
  }

  public setFocus(focused: boolean): void {
    this.isFocused = focused;

    if (
      !this.isFocused &&
      this.control.value !== '' &&
      this.control.value != null
    ) {
      this.formattedDate = this.convertDateToString(
        new Date(this.control.value)
      );
    }
  }

  public get month(): string {
    return Object.values(Months)[this.selectedMonth] as string;
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
}
