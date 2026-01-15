import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTimelineComponent } from './appointment-timeline.component';

describe('AppointmentTimelineComponent', () => {
  let component: AppointmentTimelineComponent;
  let fixture: ComponentFixture<AppointmentTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
