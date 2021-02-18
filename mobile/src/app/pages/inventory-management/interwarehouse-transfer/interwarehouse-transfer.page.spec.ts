import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterwarehouseTransferPage } from './interwarehouse-transfer.page';

describe('InterwarehouseTransferPage', () => {
  let component: InterwarehouseTransferPage;
  let fixture: ComponentFixture<InterwarehouseTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterwarehouseTransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterwarehouseTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
