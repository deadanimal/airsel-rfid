import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetRegistrationListPage } from './asset-registration-list.page';

describe('AssetRegistrationListPage', () => {
  let component: AssetRegistrationListPage;
  let fixture: ComponentFixture<AssetRegistrationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRegistrationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetRegistrationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
