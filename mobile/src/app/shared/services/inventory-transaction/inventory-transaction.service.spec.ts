import { TestBed } from '@angular/core/testing';

import { InventoryTransactionService } from './inventory-transaction.service'

describe('InventoryTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryTransactionService = TestBed.get(InventoryTransactionService);
    expect(service).toBeTruthy();
  });
});
