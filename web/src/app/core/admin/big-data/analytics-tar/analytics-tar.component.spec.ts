import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTarComponent } from './analytics-tar.component';

describe('AnalyticsTarComponent', () => {
  let component: AnalyticsTarComponent;
  let fixture: ComponentFixture<AnalyticsTarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsTarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
