import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockIssuancePage } from './stock-issuance.page';

describe('StockIssuancePage', () => {
  let component: StockIssuancePage;
  let fixture: ComponentFixture<StockIssuancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIssuancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockIssuancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
