import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePopUpComponent } from './remove-pop-up.component';

describe('RemovePopUpComponent', () => {
  let component: RemovePopUpComponent;
  let fixture: ComponentFixture<RemovePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
