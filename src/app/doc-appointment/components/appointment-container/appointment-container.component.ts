import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment, Doctor } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-container',
  templateUrl: './appointment-container.component.html',
  styleUrl: './appointment-container.component.scss',
})
export class AppointmentContainerComponent implements OnInit {
  doctors$ = this.appointmentService.getDoctors();
  selectedDoctor: Doctor | null = null;
  appointments: Appointment[] = [];
  selectedDate: Date = new Date();

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    // Select first doctor by default for better UX
    this.doctors$.subscribe((doctors) => {
      if (doctors.length > 0) {
        this.onDoctorChange(doctors[0]);
      }
    });
  }

  resetDate() {
    this.selectedDate = new Date();
  }

  onDoctorChange(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.fetchAppointments();
  }

  fetchAppointments() {
    if (this.selectedDoctor) {
      this.appointmentService
        .getAppointments(this.selectedDoctor.id)
        .subscribe((apps) => {
          this.appointments = apps;
        });
    }
  }

  showBookingDialog = false;
  bookingForm: any = {
    patientName: '',
    type: 'New',
    notes: '',
  };
  selectedSlot: any = null;

  onSlotClick(event: { day: Date; time: string; minutes: number }) {
    this.selectedSlot = event;
    this.bookingForm = { patientName: '', type: 'New', notes: '' };
    this.showBookingDialog = true;
  }

  saveAppointment() {
    if (!this.selectedDoctor || !this.selectedSlot) return;

    const newApp: Appointment = {
      id: 0, // Service handles ID
      doctorId: this.selectedDoctor.id,
      patientName: this.bookingForm.patientName,
      date: this.selectedSlot.day.toISOString().split('T')[0],
      startMinutes: this.selectedSlot.minutes,
      endMinutes: this.selectedSlot.minutes + 30, // Default 30 min duration
      type: this.bookingForm.type,
      notes: this.bookingForm.notes,
    };

    this.appointmentService.addAppointment(newApp).subscribe((success) => {
      if (success) {
        this.showBookingDialog = false;
        this.fetchAppointments(); // Refresh timeline
      } else {
        alert('Slot might be overlapping!');
      }
    });
  }
}
