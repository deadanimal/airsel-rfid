import { TestBed } from '@angular/core/testing';

import { AssetAttributeService } from './asset-attribute.service';

describe('AssetAttributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetAttributeService = TestBed.get(AssetAttributeService);
    expect(service).toBeTruthy();
  });
});
