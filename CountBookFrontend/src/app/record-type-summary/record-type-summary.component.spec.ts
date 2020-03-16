import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTypeSummaryComponent } from './record-type-summary.component';

describe('RecordCategorySummaryComponent', () => {
  let component: RecordTypeSummaryComponent;
  let fixture: ComponentFixture<RecordTypeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordTypeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTypeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
