import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShoppingListComponent } from './add-shopping-list.component';

describe('AddShoppingListComponent', () => {
  let component: AddShoppingListComponent;
  let fixture: ComponentFixture<AddShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
