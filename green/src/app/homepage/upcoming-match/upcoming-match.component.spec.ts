import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMatchComponent } from './upcoming-match.component';

describe('UpcomingMatchComponent', () => {
  let component: UpcomingMatchComponent;
  let fixture: ComponentFixture<UpcomingMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
