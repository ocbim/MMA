import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthviewComponent } from './monthview.component';

describe('MonthviewComponent', () => {
  let component: MonthviewComponent;
  let fixture: ComponentFixture<MonthviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
