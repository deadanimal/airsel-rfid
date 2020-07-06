import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockCountListPage } from './stock-count-list.page';

describe('StockCountListPage', () => {
  let component: StockCountListPage;
  let fixture: ComponentFixture<StockCountListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCountListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockCountListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
