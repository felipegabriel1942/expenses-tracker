import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from './../../@shared/components/card/card.module';
import { CheckboxModule } from './../../@shared/components/checkbox/checkbox.module';
import { SelectModule } from './../../@shared/components/select/select.module';
import { InputModule } from 'src/app/@shared/components/input';
import { DatepickerModule } from './../../@shared/components/datepicker/datepicker.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    CheckboxModule,
    SelectModule,
    InputModule,
    DatepickerModule,
    ReactiveFormsModule
  ],
})
export class HomeModule {}
