import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityUserPrivilegesComponent } from './utility-user-privileges.component';

describe('UtilityUserPrivilegesComponent', () => {
  let component: UtilityUserPrivilegesComponent;
  let fixture: ComponentFixture<UtilityUserPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityUserPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityUserPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
