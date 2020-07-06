import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStoreKeeperComponent } from './inventory-store-keeper.component';

describe('InventoryStoreKeeperComponent', () => {
  let component: InventoryStoreKeeperComponent;
  let fixture: ComponentFixture<InventoryStoreKeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryStoreKeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStoreKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
