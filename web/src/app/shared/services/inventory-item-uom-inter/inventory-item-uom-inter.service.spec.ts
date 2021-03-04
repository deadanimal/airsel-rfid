import { TestBed } from '@angular/core/testing';

import { InventoryItemUomInterService } from './inventory-item-uom-inter.service';

describe('InventoryItemUomInterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryItemUomInterService = TestBed.get(InventoryItemUomInterService);
    expect(service).toBeTruthy();
  });
});
