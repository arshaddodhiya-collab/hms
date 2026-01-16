import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment, Doctor } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private appointments: Appointment[] = [
    {
      id: 1,
      doctorId: 1,
      patientName: 'Rahul Sharma',
      date: '2026-01-15',
      startMinutes: 610,
      endMinutes: 640,
      type: 'New',
      notes: 'High fever',
    },
  ];

  getDoctors(): Observable<Doctor[]> {
    return of([
      { id: 1, name: 'Dr. John Doe', specialization: 'General Physician' },
      { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist' },
      { id: 3, name: 'Dr. Emily White', specialization: 'Pediatrician' },
    ]);
  }

  getAppointments(doctorId: number): Observable<Appointment[]> {
    return of(this.appointments.filter((a) => a.doctorId === doctorId));
  }

  addAppointment(appointment: Appointment): Observable<boolean> {
    // Basic validation: Check for overlap
    const hasOverlap = this.appointments.some(
      (a) =>
        a.doctorId === appointment.doctorId &&
        a.date === appointment.date &&
        ((appointment.startMinutes >= a.startMinutes &&
          appointment.startMinutes < a.endMinutes) ||
          (appointment.endMinutes > a.startMinutes &&
            appointment.endMinutes <= a.endMinutes))
    );

    if (hasOverlap) {
      console.warn('Slot overlap detected!');
      return of(false);
    }

    this.appointments.push({ ...appointment, id: Date.now() });
    return of(true);
  }

  cancelAppointment(id: number): Observable<boolean> {
    this.appointments = this.appointments.filter((a) => a.id !== id);
    return of(true);
  }
}
