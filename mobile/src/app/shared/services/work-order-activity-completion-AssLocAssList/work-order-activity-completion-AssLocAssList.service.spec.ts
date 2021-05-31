import { TestBed } from '@angular/core/testing';
import { WorkOrderActivityCompletionAssLocAssListService } from './work-order-activity-completion-AssLocAssList.service';

describe('WorkOrderActivityCompletionAssLocAssListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkOrderActivityCompletionAssLocAssListService = TestBed.get(WorkOrderActivityCompletionAssLocAssListService);
    expect(service).toBeTruthy();
  });
});
