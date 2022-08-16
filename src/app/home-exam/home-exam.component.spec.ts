import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExamComponent } from './home-exam.component';

describe('HomeExamComponent', () => {
  let component: HomeExamComponent;
  let fixture: ComponentFixture<HomeExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
