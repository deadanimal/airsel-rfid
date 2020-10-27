import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeasurementTypePage } from './measurement-type.page';

describe('MeasurementTypePage', () => {
  let component: MeasurementTypePage;
  let fixture: ComponentFixture<MeasurementTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeasurementTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
