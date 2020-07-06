import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityAuditTrailComponent } from './utility-audit-trail.component';

describe('UtilityAuditTrailComponent', () => {
  let component: UtilityAuditTrailComponent;
  let fixture: ComponentFixture<UtilityAuditTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityAuditTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
