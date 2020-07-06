import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockReceivePage } from './stock-receive.page';

describe('StockReceivePage', () => {
  let component: StockReceivePage;
  let fixture: ComponentFixture<StockReceivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReceivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockReceivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
