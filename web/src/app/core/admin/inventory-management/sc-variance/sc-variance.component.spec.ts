import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScVarianceComponent } from './sc-variance.component';

describe('ScVarianceComponent', () => {
  let component: ScVarianceComponent;
  let fixture: ComponentFixture<ScVarianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScVarianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
