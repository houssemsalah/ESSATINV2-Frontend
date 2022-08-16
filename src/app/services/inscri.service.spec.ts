import { TestBed } from '@angular/core/testing';

import { InscriService } from './inscri.service';

describe('InscriService', () => {
  let service: InscriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
