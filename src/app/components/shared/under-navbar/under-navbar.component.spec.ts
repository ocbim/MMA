import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderNavbarComponent } from './under-navbar.component';

describe('UnderNavbarComponent', () => {
  let component: UnderNavbarComponent;
  let fixture: ComponentFixture<UnderNavbarComponent>;

  beforeEach(async(() => {
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
