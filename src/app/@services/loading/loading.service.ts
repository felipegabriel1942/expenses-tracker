import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setLoading(status: boolean): void {
    this.loading.next(status);
  }

  public getLoading(): BehaviorSubject<boolean> {
    return this.loading;
  }
}
