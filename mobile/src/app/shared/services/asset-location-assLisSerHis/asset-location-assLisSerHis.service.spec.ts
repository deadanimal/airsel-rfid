import { TestBed } from '@angular/core/testing';

import { AssetLocatiomAssLisSerHisService } from './asset-location-assLisSerHis.service';

describe('AssetLocatiomAssLisSerHisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetLocatiomAssLisSerHisService = TestBed.get(AssetLocatiomAssLisSerHisService);
    expect(service).toBeTruthy();
  });
});
