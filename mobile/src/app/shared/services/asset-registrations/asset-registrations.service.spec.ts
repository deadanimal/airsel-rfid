import { TestBed } from '@angular/core/testing';

import { AssetRegistrationsService } from './asset-registrations.service';

describe('AssetRegistrationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetRegistrationsService = TestBed.get(AssetRegistrationsService);
    expect(service).toBeTruthy();
  });
});
