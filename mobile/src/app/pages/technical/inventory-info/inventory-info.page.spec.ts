import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryInfoPage } from './inventory-info.page';

describe('InventoryInfoPage', () => {
  let component: InventoryInfoPage;
  let fixture: ComponentFixture<InventoryInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
