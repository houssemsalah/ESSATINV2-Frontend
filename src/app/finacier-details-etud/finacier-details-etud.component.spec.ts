import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinacierDetailsEtudComponent } from './finacier-details-etud.component';

describe('FinacierDetailsEtudComponent', () => {
  let component: FinacierDetailsEtudComponent;
  let fixture: ComponentFixture<FinacierDetailsEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinacierDetailsEtudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinacierDetailsEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
