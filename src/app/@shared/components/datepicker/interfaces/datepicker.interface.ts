import { AbstractControl } from '@angular/forms';

export class DatepickerInterface {
  id: number | string;
  control: AbstractControl;
  label?: string;
}
