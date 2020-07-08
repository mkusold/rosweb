import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosControllerComponent } from './ros-controller.component';

describe('RosControllerComponent', () => {
  let component: RosControllerComponent;
  let fixture: ComponentFixture<RosControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
