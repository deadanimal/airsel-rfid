import { TestBed } from '@angular/core/testing';

import { ServiceHistoryService } from './service-history.service';

describe('ServiceHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceHistoryService = TestBed.get(ServiceHistoryService);
    expect(service).toBeTruthy();
  });
});
