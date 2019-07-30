import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTennisImageComponent } from './display-tennis-image.component';

describe('DisplayTennisImageComponent', () => {
  let component: DisplayTennisImageComponent;
  let fixture: ComponentFixture<DisplayTennisImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTennisImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTennisImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
