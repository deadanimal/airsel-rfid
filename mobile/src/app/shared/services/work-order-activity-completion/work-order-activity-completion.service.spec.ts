import { TestBed } from '@angular/core/testing';
import { WorkOrderActivityCompletionService } from './work-order-activity-completion.service';

describe('WorkOrderActivityCompletionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkOrderActivityCompletionService = TestBed.get(WorkOrderActivityCompletionService);
    expect(service).toBeTruthy();
  });
});
