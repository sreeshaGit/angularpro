import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultibetFooterComponent } from './multibet-footer.component';

describe('MultibetFooterComponent', () => {
  let component: MultibetFooterComponent;
  let fixture: ComponentFixture<MultibetFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultibetFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultibetFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
