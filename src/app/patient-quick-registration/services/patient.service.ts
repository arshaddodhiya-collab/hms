import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  savePatient(payload: Patient): Observable<boolean> {
    console.log('API payload:', payload);
    return of(true);
  }
}
