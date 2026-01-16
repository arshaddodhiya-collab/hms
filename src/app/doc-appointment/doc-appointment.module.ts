import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AppointmentRoutingModule } from './doc-appointment-routing.module';

import { AppointmentContainerComponent } from './components/appointment-container/appointment-container.component';
import { AppointmentTimelineComponent } from './components/appointment-timeline/appointment-timeline.component';
import { AppointmentSlotComponent } from './components/appointment-slot/appointment-slot.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentStatusDirective } from './directives/appointment-status.directive';

@NgModule({
  declarations: [
    AppointmentContainerComponent,
    AppointmentTimelineComponent,
    AppointmentSlotComponent,
    AppointmentStatusDirective,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DragDropModule,
    DialogModule,
  ],
})
export class AppointmentModule {}
