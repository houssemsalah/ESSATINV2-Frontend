import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeEtuFinaComponent } from './paye-etu-fina.component';

describe('PayeEtuFinaComponent', () => {
  let component: PayeEtuFinaComponent;
  let fixture: ComponentFixture<PayeEtuFinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeEtuFinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeEtuFinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
