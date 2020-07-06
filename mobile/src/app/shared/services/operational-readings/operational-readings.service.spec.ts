import { TestBed } from '@angular/core/testing';

import { OperationalReadingsService } from './operational-readings.service';

describe('OperationalReadingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationalReadingsService = TestBed.get(OperationalReadingsService);
    expect(service).toBeTruthy();
  });
});
