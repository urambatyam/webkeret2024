import { TestBed } from '@angular/core/testing';

import { ToltService } from './tolt.service';

describe('ToltService', () => {
  let service: ToltService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToltService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
