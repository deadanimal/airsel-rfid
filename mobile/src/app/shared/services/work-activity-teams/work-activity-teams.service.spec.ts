import { TestBed } from '@angular/core/testing';

import { WorkActivityTeamsService } from './work-activity-teams.service';

describe('WorkActivityTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkActivityTeamsService = TestBed.get(WorkActivityTeamsService);
    expect(service).toBeTruthy();
  });
});
