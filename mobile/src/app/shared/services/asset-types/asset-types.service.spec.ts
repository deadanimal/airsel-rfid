import { TestBed } from '@angular/core/testing';

import { AssetTypesService } from './asset-types.service';

describe('AssetTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetTypesService = TestBed.get(AssetTypesService);
    expect(service).toBeTruthy();
  });
});
