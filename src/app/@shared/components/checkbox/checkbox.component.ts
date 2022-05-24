import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { CheckboxInterface } from './interface/checkbox.interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() options: CheckboxInterface;

  constructor() {}

  ngOnInit(): void {
    this.initOptions();
  }

  initOptions(): void {}
}
