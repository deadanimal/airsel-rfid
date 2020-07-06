import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisposePage } from './dispose.page';

describe('DisposePage', () => {
  let component: DisposePage;
  let fixture: ComponentFixture<DisposePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisposePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
