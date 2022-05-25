import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { SharedModule } from './../../shared.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, SharedModule],
  exports: [SelectComponent]
})
export class SelectModule {}
