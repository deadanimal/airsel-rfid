import { TestBed } from '@angular/core/testing';

import { InventoryGrnService } from './inventory-grn.service'

describe('InventoryGrnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryGrnService = TestBed.get(InventoryGrnService);
    expect(service).toBeTruthy();
  });
});
