import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicherComponent } from './ficher.component';

describe('FicherComponent', () => {
  let component: FicherComponent;
  let fixture: ComponentFixture<FicherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
