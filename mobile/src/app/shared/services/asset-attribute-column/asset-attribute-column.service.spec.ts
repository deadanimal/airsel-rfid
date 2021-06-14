import { TestBed } from '@angular/core/testing';

import { AssetAttributeColumnService } from './asset-attribute-column.service';

describe('AssetAttributeColumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetAttributeColumnService = TestBed.get(AssetAttributeColumnService);
    expect(service).toBeTruthy();
  });
});
