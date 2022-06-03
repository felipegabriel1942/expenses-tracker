import { AbstractControl } from '@angular/forms';

export class InputInterface {
  id: number | string;
  control: AbstractControl;
  label?: string;
}
