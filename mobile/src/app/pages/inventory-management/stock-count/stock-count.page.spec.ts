import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockCountPage } from './stock-count.page';

describe('StockCountPage', () => {
  let component: StockCountPage;
  let fixture: ComponentFixture<StockCountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockCountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
