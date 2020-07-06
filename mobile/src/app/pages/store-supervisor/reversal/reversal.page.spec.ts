import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReversalPage } from './reversal.page';

describe('ReversalPage', () => {
  let component: ReversalPage;
  let fixture: ComponentFixture<ReversalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReversalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
