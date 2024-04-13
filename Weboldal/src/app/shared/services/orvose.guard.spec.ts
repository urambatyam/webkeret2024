import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { OrvosGuard } from './orvose.guard';

describe('orvoseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => OrvosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
