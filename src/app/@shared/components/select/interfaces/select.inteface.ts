import { SelectOptionInterface } from './select-option.interface';
import { AbstractControl } from '@angular/forms';

export interface SelectInterface {
  id: number | string;
  control: AbstractControl;
  options: Array<SelectOptionInterface>;
  label?: string;
}
