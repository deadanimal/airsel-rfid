import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterWarehouseTransferPage } from './inter-warehouse-transfer.page';

describe('InterWarehouseTransferPage', () => {
  let component: InterWarehouseTransferPage;
  let fixture: ComponentFixture<InterWarehouseTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterWarehouseTransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterWarehouseTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
