import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStoreCodesComponent } from './inventory-store-codes.component';

describe('InventoryStoreCodesComponent', () => {
  let component: InventoryStoreCodesComponent;
  let fixture: ComponentFixture<InventoryStoreCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryStoreCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStoreCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
