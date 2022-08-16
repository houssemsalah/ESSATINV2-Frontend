import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesMatieresComponent } from './liste-des-matieres.component';

describe('ListeDesMatieresComponent', () => {
  let component: ListeDesMatieresComponent;
  let fixture: ComponentFixture<ListeDesMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesMatieresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDesMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
