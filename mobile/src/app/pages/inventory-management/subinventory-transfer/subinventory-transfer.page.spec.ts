import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubinventoryTransferPage } from './subinventory-transfer.page';

describe('SubinventoryTransferPage', () => {
  let component: SubinventoryTransferPage;
  let fixture: ComponentFixture<SubinventoryTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubinventoryTransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubinventoryTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
