import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAcsComponent } from './analytics-acs.component';

describe('AnalyticsAcsComponent', () => {
  let component: AnalyticsAcsComponent;
  let fixture: ComponentFixture<AnalyticsAcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsAcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsAcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
