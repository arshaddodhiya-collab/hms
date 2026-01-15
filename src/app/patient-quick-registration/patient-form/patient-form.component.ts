import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PatientFormComponent implements OnInit {
  form!: FormGroup;

  genders = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];

  titles = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Ms', value: 'Ms' },
    { label: 'Mrs', value: 'Mrs' },
    { label: 'Dr', value: 'Dr' },
  ];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      gender: [null, Validators.required],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: [null, [Validators.required, this.minimumAgeValidator(18)]],
      contactNumber: ['', Validators.required],
      nationality: ['Indian', Validators.required],
      address: this.fb.group({
        addressLine: ['', Validators.required],
        area: ['', Validators.required],
        city: [''],
        pincode: ['', Validators.required],
        state: [''],
        country: ['India'],
      }),
      permanentAddress: this.fb.group({
        addressLine: ['', Validators.required],
        area: ['', Validators.required],
        city: [''],
        pincode: ['', Validators.required],
        state: [''],
        country: ['India'],
      }),
      sameAsPermanent: [true],
      emergencyContacts: this.fb.array([]),
    });

    this.checkAddressSync();
    this.form.get('sameAsPermanent')?.valueChanges.subscribe(() => {
      this.checkAddressSync();
    });
  }

  get emergencyContacts(): FormArray {
    return this.form.get('emergencyContacts') as FormArray;
  }

  addEmergencyContact(): void {
    const contactGroup = this.fb.group({
      name: ['', Validators.required],
      relation: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
    this.emergencyContacts.push(contactGroup);
  }

  removeEmergencyContact(index: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this contact?',
      accept: () => {
        this.emergencyContacts.removeAt(index);
        this.messageService.add({
          severity: 'info',
          summary: 'Contact Removed',
          detail: 'Emergency contact has been removed.',
        });
      },
    });
  }

  checkAddressSync(): void {
    const isSame = this.form.get('sameAsPermanent')?.value;
    const permAddress = this.form.get('permanentAddress');

    if (isSame) {
      permAddress?.disable();
      permAddress?.reset();
    } else {
      permAddress?.enable();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      // Debugging: Get all errors
      const invalid = [];
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
          console.log(`${name} is invalid:`, controls[name].errors);
        }
      }
      // Check groups
      if (this.form.get('address')?.invalid)
        console.log('Address group is invalid');
      if (this.form.get('permanentAddress')?.invalid)
        console.log('Permanent Address group is invalid');

      console.log('Invalid Controls:', invalid);

      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail:
          'Please fill all required fields correctly. Check invalid fields highlighted in red.',
      });
      return;
    }

    const payload = this.form.getRawValue();
    if (payload.sameAsPermanent) {
      payload.permanentAddress = { ...payload.address };
    }

    this.patientService.savePatient(payload).subscribe((success) => {
      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Patient registered successfully.',
        });
        this.form.reset();
        this.form.patchValue({
          nationality: 'Indian',
          sameAsPermanent: true,
          address: { country: 'India' },
        });
        this.emergencyContacts.clear();
      }
    });
  }

  reset(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to reset the form?',
      accept: () => {
        this.form.reset();
        this.emergencyContacts.clear();
        this.messageService.add({
          severity: 'warn',
          summary: 'Reset',
          detail: 'Form has been cleared.',
        });
      },
    });
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Required validator handles empty values
      }
      const dob = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= minAge
        ? null
        : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }
}
