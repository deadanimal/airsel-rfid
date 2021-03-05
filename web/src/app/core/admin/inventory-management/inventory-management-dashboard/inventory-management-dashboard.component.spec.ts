import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementDashboardComponent } from './inventory-dashboard.component';

describe('InventoryManagementDashboardComponent', () => {
  let component: InventoryManagementDashboardComponent;
  let fixture: ComponentFixture<InventoryManagementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryManagementDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
