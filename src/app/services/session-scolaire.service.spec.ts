import { TestBed } from '@angular/core/testing';

import { SessionScolaireService } from './session-scolaire.service';

describe('SessionScolaireService', () => {
  let service: SessionScolaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionScolaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
