import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutbondComponent } from './inventory-outbond.component';

describe('InventoryOutbondComponent', () => {
  let component: InventoryOutbondComponent;
  let fixture: ComponentFixture<InventoryOutbondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutbondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutbondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
