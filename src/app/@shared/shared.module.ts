import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FocusDirective } from './directives/focus.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [FocusDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule,
  ],
  exports: [
    ReactiveFormsModule,
    NgxMaskModule,
    FocusDirective,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
