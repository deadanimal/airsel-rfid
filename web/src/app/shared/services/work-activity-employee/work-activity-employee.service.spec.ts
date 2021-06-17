import { TestBed } from '@angular/core/testing';

import { WorkActivityEmployeeService } from './work-activity-employee.service';

describe('WorkActivityEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkActivityEmployeeService = TestBed.get(WorkActivityEmployeeService);
    expect(service).toBeTruthy();
  });
});
