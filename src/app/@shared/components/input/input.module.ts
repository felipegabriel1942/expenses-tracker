import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SharedModule } from '../../shared.module';
import { ErrorMessageModule } from '../error-message';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, SharedModule, ErrorMessageModule],
  exports: [InputComponent]
})
export class InputModule {}
