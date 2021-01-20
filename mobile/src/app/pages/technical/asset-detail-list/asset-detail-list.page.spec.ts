import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetDetailListPage } from './asset-detail-list.page';

describe('AssetDetailListPage', () => {
  let component: AssetDetailListPage;
  let fixture: ComponentFixture<AssetDetailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDetailListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetDetailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
