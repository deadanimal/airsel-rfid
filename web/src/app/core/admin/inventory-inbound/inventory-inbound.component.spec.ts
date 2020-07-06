import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInboundComponent } from './inventory-inbound.component';

describe('InventoryInboundComponent', () => {
  let component: InventoryInboundComponent;
  let fixture: ComponentFixture<InventoryInboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInboundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
