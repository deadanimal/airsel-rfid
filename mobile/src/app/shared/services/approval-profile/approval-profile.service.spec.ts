import { TestBed } from '@angular/core/testing';

import { ApprovalProfileService } from './approval-profile.service';

describe('ApprovalProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalProfileService = TestBed.get(ApprovalProfileService);
    expect(service).toBeTruthy();
  });
});
