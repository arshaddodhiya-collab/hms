import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  savePatient(patient: Patient): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(delay(1000));
  }

  checkContactUnique(contact: string): Observable<boolean> {
    // Mock check: numbers ending in '000' are duplicates
    const isDuplicate = contact && contact.endsWith('000');
    return of(!isDuplicate).pipe(delay(1000));
  }
}
