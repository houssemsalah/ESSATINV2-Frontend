import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleDeEmergComponent } from './feuille-de-emerg.component';

describe('FeuilleDeEmergComponent', () => {
  let component: FeuilleDeEmergComponent;
  let fixture: ComponentFixture<FeuilleDeEmergComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeuilleDeEmergComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeuilleDeEmergComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
