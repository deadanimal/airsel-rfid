import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeNoComponent } from './badge-no.component';

describe('BadgeNoComponent', () => {
  let component: BadgeNoComponent;
  let fixture: ComponentFixture<BadgeNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
