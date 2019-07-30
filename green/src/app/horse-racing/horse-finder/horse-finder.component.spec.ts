import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseFinderComponent } from './horse-finder.component';

describe('HorseFinderComponent', () => {
  let component: HorseFinderComponent;
  let fixture: ComponentFixture<HorseFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
