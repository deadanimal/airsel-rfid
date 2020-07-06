import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsWaComponent } from './analytics-wa.component';

describe('AnalyticsWaComponent', () => {
  let component: AnalyticsWaComponent;
  let fixture: ComponentFixture<AnalyticsWaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsWaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
