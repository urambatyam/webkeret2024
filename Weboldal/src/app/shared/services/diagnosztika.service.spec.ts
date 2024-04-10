import { TestBed } from '@angular/core/testing';

import { DiagnosztikaService } from './diagnosztika.service';

describe('DiagnosztikaService', () => {
  let service: DiagnosztikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosztikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
