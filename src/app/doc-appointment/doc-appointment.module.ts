import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './doc-appointment-routing.module';

import { AppointmentContainerComponent } from './components/appointment-container/appointment-container.component';
import { AppointmentTimelineComponent } from './components/appointment-timeline/appointment-timeline.component';
import { AppointmentSlotComponent } from './components/appointment-slot/appointment-slot.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppointmentContainerComponent,
    AppointmentTimelineComponent,
    AppointmentSlotComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CardModule,
  ],
})
export class AppointmentModule {}
