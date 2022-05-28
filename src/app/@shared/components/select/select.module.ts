import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { SharedModule } from './../../shared.module';
import { ErrorMessageModule } from '../error-message';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, SharedModule, ErrorMessageModule],
  exports: [SelectComponent],
})
export class SelectModule {}
