import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsTodayComponent } from './highlights-today.component';

describe('HighlightsTodayComponent', () => {
  let component: HighlightsTodayComponent;
  let fixture: ComponentFixture<HighlightsTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightsTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
