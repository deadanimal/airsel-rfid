import { TestBed } from '@angular/core/testing';

import { AssetLocatioSyncService } from './asset-location-sync.service';

describe('AssetLocatioSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetLocatioSyncService = TestBed.get(AssetLocatioSyncService);
    expect(service).toBeTruthy();
  });
});
