import { Component, Input, OnInit } from '@angular/core';

import { CardInterface } from './interface/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() options: CardInterface;

  constructor() {}

  ngOnInit(): void {
    this.initOptions();
  }

  initOptions(): void {
    this.options = Object.assign(
      {
        hasHeader: true,
      },
      this.options
    );
  }
}
