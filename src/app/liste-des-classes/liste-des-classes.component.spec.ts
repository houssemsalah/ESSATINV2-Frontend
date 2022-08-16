import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesClassesComponent } from './liste-des-classes.component';

describe('ListeDesClassesComponent', () => {
  let component: ListeDesClassesComponent;
  let fixture: ComponentFixture<ListeDesClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDesClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
