import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeInputComponent } from './all-time-input.component';

describe('AllTimeInputComponent', () => {
  let component: AllTimeInputComponent;
  let fixture: ComponentFixture<AllTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
