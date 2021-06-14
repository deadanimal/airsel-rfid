import { TestBed } from '@angular/core/testing';

import { MainOperationOrganisationService } from './main-operation-organisation.service';

describe('MainOperationOrganisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainOperationOrganisationService = TestBed.get(MainOperationOrganisationService);
    expect(service).toBeTruthy();
  });
});
