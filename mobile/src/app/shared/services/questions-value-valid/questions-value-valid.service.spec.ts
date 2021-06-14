import { TestBed } from '@angular/core/testing';
import { QuestionValidValueService } from './questions-value-valid.service';

describe('QuestionValidValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionValidValueService = TestBed.get(QuestionValidValueService);
    expect(service).toBeTruthy();
  });
});
