import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleEtudianteComponent } from './detaille-etudiante.component';

describe('DetailleEtudianteComponent', () => {
  let component: DetailleEtudianteComponent;
  let fixture: ComponentFixture<DetailleEtudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleEtudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleEtudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
