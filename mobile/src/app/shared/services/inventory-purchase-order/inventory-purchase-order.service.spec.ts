import { TestBed } from '@angular/core/testing';

import { InventoryPurchaseOrderService } from './inventory-purchase-order.service'

describe('InventoryPurchaseOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryPurchaseOrderService = TestBed.get(InventoryPurchaseOrderService);
    expect(service).toBeTruthy();
  });
});
