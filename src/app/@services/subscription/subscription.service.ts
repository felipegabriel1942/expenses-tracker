import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptions: Subscription[] = [];

  constructor() {}

  add(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
