import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockDisposalPage } from './stock-disposal.page';

describe('StockDisposalPage', () => {
  let component: StockDisposalPage;
  let fixture: ComponentFixture<StockDisposalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDisposalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockDisposalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
