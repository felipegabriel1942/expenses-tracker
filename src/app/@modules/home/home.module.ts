import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from './../../@shared/components/card/card.module';
import { CheckboxModule } from './../../@shared/components/checkbox/checkbox.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, CardModule, CheckboxModule],
})
export class HomeModule {}
