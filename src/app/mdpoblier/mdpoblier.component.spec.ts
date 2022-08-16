import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpoblierComponent } from './mdpoblier.component';

describe('MdpoblierComponent', () => {
  let component: MdpoblierComponent;
  let fixture: ComponentFixture<MdpoblierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdpoblierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpoblierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
