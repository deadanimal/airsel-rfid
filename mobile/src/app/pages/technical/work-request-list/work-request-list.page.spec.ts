import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkRequestListPage } from './work-request-list.page';

describe('WorkRequestListPage', () => {
  let component: WorkRequestListPage;
  let fixture: ComponentFixture<WorkRequestListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkRequestListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkRequestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
