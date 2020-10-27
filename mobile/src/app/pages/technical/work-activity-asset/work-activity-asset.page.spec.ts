import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkActivityAssetPage } from './work-activity-asset.page';

describe('WorkActivityAssetPage', () => {
  let component: WorkActivityAssetPage;
  let fixture: ComponentFixture<WorkActivityAssetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityAssetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkActivityAssetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
