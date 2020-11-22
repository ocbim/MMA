import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditOrdersComponent } from './edit-orders.component';

describe('EditOrdersComponent', () => {
  let component: EditOrdersComponent;
  let fixture: ComponentFixture<EditOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
