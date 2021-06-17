import { TestBed } from '@angular/core/testing';

import { WorkActivitiesService } from './work-activities.service';

describe('WorkActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkActivitiesService = TestBed.get(WorkActivitiesService);
    expect(service).toBeTruthy();
  });
});
