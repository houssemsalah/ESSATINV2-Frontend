import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMatiereComponent } from './modifier-matiere.component';

describe('ModifierMatiereComponent', () => {
  let component: ModifierMatiereComponent;
  let fixture: ComponentFixture<ModifierMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
