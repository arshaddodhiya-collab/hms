import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientQuickRegistrationRoutingModule } from './patient-quick-registration-routing.module';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [PatientFormComponent, AddressComponent],
  imports: [
    CommonModule,
    PatientQuickRegistrationRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CheckboxModule,
    DividerModule,
    CardModule,
    InputMaskModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class PatientQuickRegistrationModule {}
