import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PatientService } from '../services/patient.service';

export function uniqueContactValidator(
  patientService: PatientService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return timer(500).pipe(
      switchMap(() => patientService.checkContactUnique(control.value)),
      map((isUnique) => (isUnique ? null : { uniqueContact: true }))
    );
  };
}
