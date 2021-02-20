import { TestBed } from '@angular/core/testing';

import { InventoryMaterialRequestService } from './inventory-material-request.service'

describe('InventoryMaterialRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryMaterialRequestService = TestBed.get(InventoryMaterialRequestService);
    expect(service).toBeTruthy();
  });
});
