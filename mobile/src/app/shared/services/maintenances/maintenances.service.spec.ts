import { TestBed } from '@angular/core/testing';

import { MaintenancesService } from './maintenances.service';

describe('MaintenancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenancesService = TestBed.get(MaintenancesService);
    expect(service).toBeTruthy();
  });
});
