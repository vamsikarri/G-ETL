import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GMainComponent } from './g-main.component';

describe('GMainComponent', () => {
  let component: GMainComponent;
  let fixture: ComponentFixture<GMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
