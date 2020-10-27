import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperationalReadingListPage } from './operational-reading-list.page';

describe('OperationalReadingListPage', () => {
  let component: OperationalReadingListPage;
  let fixture: ComponentFixture<OperationalReadingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalReadingListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationalReadingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
