import { TestBed } from '@angular/core/testing';

import { MaintenanceManagerService } from './maintenance-manager.service';

describe('MaintenanceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceManagerService = TestBed.get(MaintenanceManagerService);
    expect(service).toBeTruthy();
  });
});
