import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToReviewPage } from './to-review.page';

describe('ToReviewPage', () => {
  let component: ToReviewPage;
  let fixture: ComponentFixture<ToReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
