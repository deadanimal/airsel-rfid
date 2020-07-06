import { TestBed } from '@angular/core/testing';

import { WorkRequestsService } from './work-requests.service';

describe('WorkRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkRequestsService = TestBed.get(WorkRequestsService);
    expect(service).toBeTruthy();
  });
});
