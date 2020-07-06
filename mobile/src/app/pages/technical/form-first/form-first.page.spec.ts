import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormFirstPage } from './form-first.page';

describe('FormFirstPage', () => {
  let component: FormFirstPage;
  let fixture: ComponentFixture<FormFirstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFirstPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
