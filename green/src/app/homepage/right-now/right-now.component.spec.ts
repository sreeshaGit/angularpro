import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNowComponent } from './right-now.component';

describe('RightNowComponent', () => {
  let component: RightNowComponent;
  let fixture: ComponentFixture<RightNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
