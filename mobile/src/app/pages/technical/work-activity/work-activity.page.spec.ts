import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkActivityPage } from './work-activity.page';

describe('WorkActivityPage', () => {
  let component: WorkActivityPage;
  let fixture: ComponentFixture<WorkActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
