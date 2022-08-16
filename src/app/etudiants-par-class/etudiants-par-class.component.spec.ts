import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsParClassComponent } from './etudiants-par-class.component';

describe('EtudiantsParClassComponent', () => {
  let component: EtudiantsParClassComponent;
  let fixture: ComponentFixture<EtudiantsParClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantsParClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantsParClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
