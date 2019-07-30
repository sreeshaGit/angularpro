import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlayerProfileComponent } from './create-player-profile.component';

describe('CreatePlayerProfileComponent', () => {
  let component: CreatePlayerProfileComponent;
  let fixture: ComponentFixture<CreatePlayerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlayerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlayerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
