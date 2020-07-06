import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkRequestPage } from './work-request.page';

describe('WorkRequestPage', () => {
  let component: WorkRequestPage;
  let fixture: ComponentFixture<WorkRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
