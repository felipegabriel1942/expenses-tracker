import { Component, Input, OnInit } from '@angular/core';

import { CheckboxInterface } from './interface/checkbox.interface';
import { IC_CHECK_WHITE } from './../../../consts/assets';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() options: CheckboxInterface;

  public IC_CHECK_WHITE = IC_CHECK_WHITE;

  constructor() {}

  ngOnInit(): void {
    this.initOptions();
  }

  initOptions(): void {}
}
