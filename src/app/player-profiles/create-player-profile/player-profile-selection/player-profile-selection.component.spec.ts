import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfileSelectionComponent } from './player-profile-selection.component';

describe('PlayerProfileSelectionComponent', () => {
  let component: PlayerProfileSelectionComponent;
  let fixture: ComponentFixture<PlayerProfileSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
