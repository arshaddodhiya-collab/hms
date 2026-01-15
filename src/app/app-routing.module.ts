import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'patient-registration',
    loadChildren: () =>
      import(
        './patient-quick-registration/patient-quick-registration.module'
      ).then((m) => m.PatientQuickRegistrationModule),
  },
  { path: '', redirectTo: 'patient-registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
