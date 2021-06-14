import { TestBed } from '@angular/core/testing';

import { MeasuremettypeService } from './measurement-type.service';

describe('MeasuremettypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasuremettypeService = TestBed.get(MeasuremettypeService);
    expect(service).toBeTruthy();
  });
});
