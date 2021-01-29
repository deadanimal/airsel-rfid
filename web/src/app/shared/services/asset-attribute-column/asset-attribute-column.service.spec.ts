import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAttributeColumnService } from './asset-attribute-column.service';

describe('AssetAttributeColumnService', () => {
  let component: AssetAttributeColumnService;
  let fixture: ComponentFixture<AssetAttributeColumnService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAttributeColumnService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAttributeColumnService;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
