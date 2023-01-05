/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransactionCategoryService } from './transaction-category.service';

describe('Service: TransactionCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionCategoryService]
    });
  });

  it('should ...', inject([TransactionCategoryService], (service: TransactionCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
