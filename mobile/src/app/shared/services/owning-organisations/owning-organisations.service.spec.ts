import { TestBed } from '@angular/core/testing';

import { OwningorganisationsService } from './owning-organisations.service';

describe('OwningorganisationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwningorganisationsService = TestBed.get(OwningorganisationsService);
    expect(service).toBeTruthy();
  });
});
