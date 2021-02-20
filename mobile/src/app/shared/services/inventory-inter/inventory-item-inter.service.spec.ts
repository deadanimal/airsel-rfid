import { TestBed } from '@angular/core/testing';
import { InventoryItemInterService } from './inventory-item-inter.service';

describe('InventoryItemInterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryItemInterService = TestBed.get(InventoryItemInterService);
    expect(service).toBeTruthy();
  });
});
