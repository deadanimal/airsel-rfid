import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovalProfilePage } from './approval-profile.page';

describe('ApprovalProfilePage', () => {
  let component: ApprovalProfilePage;
  let fixture: ComponentFixture<ApprovalProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovalProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
