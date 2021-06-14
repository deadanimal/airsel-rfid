import { TestBed } from '@angular/core/testing';
import { FailureProfileModelService } from './failure-profile.service';

describe('FailureProfileModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FailureProfileModelService = TestBed.get(FailureProfileModelService);
    expect(service).toBeTruthy();
  });
});
