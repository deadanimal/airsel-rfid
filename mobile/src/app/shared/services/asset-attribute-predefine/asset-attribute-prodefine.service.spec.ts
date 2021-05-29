import { TestBed } from '@angular/core/testing';

import { AssetAttributePredefineService } from './asset-attribute-prodefine.service';

describe('AssetAttributePredefineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetAttributePredefineService = TestBed.get(AssetAttributePredefineService);
    expect(service).toBeTruthy();
  });
});
