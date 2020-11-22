import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnderNavbarComponent } from './under-navbar.component';

describe('UnderNavbarComponent', () => {
  let component: UnderNavbarComponent;
  let fixture: ComponentFixture<UnderNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
