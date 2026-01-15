import { Component, Input } from '@angular/core';
import { DayColumn, TimeSlot } from '../../models/timeline.model';

@Component({
  selector: 'app-appointment-slot',
  templateUrl: './appointment-slot.component.html',
  styleUrls: ['./appointment-slot.component.scss'],
})
export class AppointmentSlotComponent {
  @Input() day!: DayColumn;
  @Input() slot!: TimeSlot;

  book(): void {
    console.log('Clicked:', this.day.label, this.slot.time);
  }
}
