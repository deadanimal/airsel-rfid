import { TestBed } from '@angular/core/testing';

import { InventoryItemIntraService } from './inventory-item-intra.service'

describe('InventoryItemIntraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryItemIntraService = TestBed.get(InventoryItemIntraService);
    expect(service).toBeTruthy();
  });
});
