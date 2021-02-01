import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceReversalComponent } from './issuance-reversal.component';

describe('IssuanceReversalComponent', () => {
  let component: IssuanceReversalComponent;
  let fixture: ComponentFixture<IssuanceReversalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuanceReversalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuanceReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
