import { TestBed } from '@angular/core/testing';

import { WorkClassService } from './work-class.service';

describe('WorkClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkClassService = TestBed.get(WorkClassService);
    expect(service).toBeTruthy();
  });
});
