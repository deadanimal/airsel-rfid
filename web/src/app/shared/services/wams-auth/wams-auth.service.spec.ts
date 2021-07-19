import { TestBed } from '@angular/core/testing';

import { WamsAuthService } from './wams-auth.service';

describe('WamsAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WamsAuthService = TestBed.get(WamsAuthService);
    expect(service).toBeTruthy();
  });
});
