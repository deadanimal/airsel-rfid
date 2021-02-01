import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReceiveReturnComponent } from './stock-receive-return.component';

describe('StockReceiveReturnComponent', () => {
  let component: StockReceiveReturnComponent;
  let fixture: ComponentFixture<StockReceiveReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReceiveReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReceiveReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
