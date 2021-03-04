import { TestBed } from '@angular/core/testing';

import { InventoryItemUomIntraService } from './inventory-item-uom-intra.service';

describe('InventoryItemUomIntraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryItemUomIntraService = TestBed.get(InventoryItemUomIntraService);
    expect(service).toBeTruthy();
  });
});
