import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperationalReadingPage } from './operational-reading.page';

describe('OperationalReadingPage', () => {
  let component: OperationalReadingPage;
  let fixture: ComponentFixture<OperationalReadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalReadingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationalReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
