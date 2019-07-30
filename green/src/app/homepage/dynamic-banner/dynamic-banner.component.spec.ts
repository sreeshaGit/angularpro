import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBannerComponent } from './dynamic-banner.component';

describe('DynamicBannerComponent', () => {
  let component: DynamicBannerComponent;
  let fixture: ComponentFixture<DynamicBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
