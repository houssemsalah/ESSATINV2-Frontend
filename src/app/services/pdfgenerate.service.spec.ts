import { TestBed } from '@angular/core/testing';

import { PdfgenerateService } from './pdfgenerate.service';

describe('PdfgenerateService', () => {
  let service: PdfgenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfgenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
