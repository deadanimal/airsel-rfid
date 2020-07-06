import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityUserComponent } from './utility-user.component';

describe('UtilityUserComponent', () => {
  let component: UtilityUserComponent;
  let fixture: ComponentFixture<UtilityUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
