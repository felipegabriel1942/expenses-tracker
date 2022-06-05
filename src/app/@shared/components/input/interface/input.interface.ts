import { AbstractControl } from '@angular/forms';
import { InputType } from '../enums/input-type.enum';

export class InputInterface {
  id: number | string;
  control: AbstractControl;
  label?: string;
  type?: InputType;
}
