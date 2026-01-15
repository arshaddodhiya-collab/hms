import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentContainerComponent } from './components/appointment-container/appointment-container.component';
import { AppointmentTimelineComponent } from './components/appointment-timeline/appointment-timeline.component';

const routes: Routes = [
  { path: '', component: AppointmentContainerComponent },
  { path: 'timeline', component: AppointmentTimelineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
