import { TestBed } from '@angular/core/testing';
import { AssetLocationAssetListServiceHistoriesService } from './asset-location-asset-list-service-histories.service';

describe('AssetLocationAssetListServiceHistoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetLocationAssetListServiceHistoriesService = TestBed.get(AssetLocationAssetListServiceHistoriesService);
    expect(service).toBeTruthy();
  });
});
