import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetLocationPage } from './asset-location.page';

describe('AssetLocationPage', () => {
  let component: AssetLocationPage;
  let fixture: ComponentFixture<AssetLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
