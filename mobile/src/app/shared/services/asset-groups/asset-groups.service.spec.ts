import { TestBed } from '@angular/core/testing';

import { AssetGroupsService } from './asset-groups.service';

describe('AssetGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetGroupsService = TestBed.get(AssetGroupsService);
    expect(service).toBeTruthy();
  });
});
