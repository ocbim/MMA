import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthNavbarComponent } from './month-navbar.component';

describe('MonthNavbarComponent', () => {
  let component: MonthNavbarComponent;
  let fixture: ComponentFixture<MonthNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
