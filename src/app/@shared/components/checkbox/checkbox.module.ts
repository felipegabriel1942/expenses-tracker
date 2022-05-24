import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './checkbox.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, SharedModule],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
