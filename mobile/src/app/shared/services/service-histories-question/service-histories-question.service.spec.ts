import { TestBed } from '@angular/core/testing';

import { ServiceHistoriesQuestionService } from './service-histories-question.service';

describe('ServiceHistoriesQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceHistoriesQuestionService = TestBed.get(ServiceHistoriesQuestionService);
    expect(service).toBeTruthy();
  });
});
