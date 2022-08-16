import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleDeNotesComponent } from './feuille-de-notes.component';

describe('FeuilleDeNotesComponent', () => {
  let component: FeuilleDeNotesComponent;
  let fixture: ComponentFixture<FeuilleDeNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeuilleDeNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeuilleDeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
