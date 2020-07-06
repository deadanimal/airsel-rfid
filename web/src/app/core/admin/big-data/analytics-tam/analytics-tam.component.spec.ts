import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTamComponent } from './analytics-tam.component';

describe('AnalyticsTamComponent', () => {
  let component: AnalyticsTamComponent;
  let fixture: ComponentFixture<AnalyticsTamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsTamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
