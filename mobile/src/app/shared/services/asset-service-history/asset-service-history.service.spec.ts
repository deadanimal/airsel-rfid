import { TestBed } from '@angular/core/testing';

import { AssetServiceHistoryService } from './asset-service-history.service';

describe('AssetServiceHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetServiceHistoryService = TestBed.get(AssetServiceHistoryService);
    expect(service).toBeTruthy();
  });
});
