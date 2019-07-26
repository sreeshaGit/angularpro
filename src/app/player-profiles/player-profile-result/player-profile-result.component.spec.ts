import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfileResultComponent } from './player-profile-result.component';

describe('PlayerProfileResultComponent', () => {
  let component: PlayerProfileResultComponent;
  let fixture: ComponentFixture<PlayerProfileResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
