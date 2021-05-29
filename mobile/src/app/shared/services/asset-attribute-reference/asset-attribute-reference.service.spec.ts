import { TestBed } from '@angular/core/testing';

import { AssetAttributeReferenceService } from './asset-attribute-reference.service';

describe('AssetAttributeReferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetAttributeReferenceService = TestBed.get(AssetAttributeReferenceService);
    expect(service).toBeTruthy();
  });
});
