import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReceivesComponent } from './stock-receives.component';

describe('StockReceivesComponent', () => {
  let component: StockReceivesComponent;
  let fixture: ComponentFixture<StockReceivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReceivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReceivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
