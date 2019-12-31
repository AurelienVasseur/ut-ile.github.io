import { TestBed } from '@angular/core/testing';

import { FutilitiesService } from './futilities.service';

describe('FutilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FutilitiesService = TestBed.get(FutilitiesService);
    expect(service).toBeTruthy();
  });
});
