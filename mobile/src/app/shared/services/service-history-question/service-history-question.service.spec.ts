import { TestBed } from '@angular/core/testing';

import { ServiceHistoryQuestionService } from './service-history-question.service';

describe('ServiceHistoryQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceHistoryQuestionService = TestBed.get(ServiceHistoryQuestionService);
    expect(service).toBeTruthy();
  });
});
