import { TestBed } from '@angular/core/testing';

import { ContributeService } from './contribute.service';

describe('ContributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContributeService = TestBed.get(ContributeService);
    expect(service).toBeTruthy();
  });
});
