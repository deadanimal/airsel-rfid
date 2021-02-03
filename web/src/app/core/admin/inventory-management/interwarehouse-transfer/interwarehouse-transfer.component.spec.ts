import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterwarehouseTransferComponent } from './interwarehouse-transfer.component';

describe('InterwarehouseTransferComponent', () => {
  let component: InterwarehouseTransferComponent;
  let fixture: ComponentFixture<InterwarehouseTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterwarehouseTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterwarehouseTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
