import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  getAppointments(): Observable<Appointment[]> {
    return of([
      {
        doctorId: 1,
        patientName: 'Rahul Sharma',
        date: '2026-01-15',
        startMinutes: 610,
        endMinutes: 625,
      },
    ]);
  }
}
