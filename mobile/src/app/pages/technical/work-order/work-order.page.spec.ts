import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkOrderPage } from './work-order.page';

describe('WorkOrderPage', () => {
  let component: WorkOrderPage;
  let fixture: ComponentFixture<WorkOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
