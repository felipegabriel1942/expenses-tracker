import { AbstractControl } from '@angular/forms';
export interface CheckboxInterface {
  id: number | string;
  control: AbstractControl;
  label?: string;
}
