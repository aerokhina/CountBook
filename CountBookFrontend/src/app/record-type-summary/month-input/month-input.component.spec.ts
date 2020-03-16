import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthInputComponent } from './month-input.component';

describe('MonthInputComponent', () => {
  let component: MonthInputComponent;
  let fixture: ComponentFixture<MonthInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
