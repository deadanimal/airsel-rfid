import { TestBed } from '@angular/core/testing';

import { WamsService } from './wams.service';

describe('WamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WamsService = TestBed.get(WamsService);
    expect(service).toBeTruthy();
  });
});
