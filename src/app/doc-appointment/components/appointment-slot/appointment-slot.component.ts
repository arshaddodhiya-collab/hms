import { Component, Input } from '@angular/core';
import { DayColumn, TimeSlot } from '../../models/timeline.model';

@Component({
  selector: 'app-appointment-slot',
  template: `<div class="slot" (click)="book()"></div>`,
  styleUrls: ['./appointment-slot.component.scss'],
})
export class AppointmentSlotComponent {
  @Input() day!: DayColumn;
  @Input() slot!: TimeSlot;

  book(): void {
    const event = {
      day: this.day.date,
      time: this.slot.time,
      minutes: this.slot.minutes,
    };
    // Dispatch custom event that propagates up or use a service
    // For simplicity, we'll assume the timeline catches this via event bubbling or shared service
    // Since this is a child of timeline, we can emit an output if we change structure,
    // but the Click is on the slot div.

    // Better approach: Let the parent handle the click if possible, or emit from here.
    // For now, let's just log it, but the parent timeline needs to know.
    // Actually, the timeline component renders the slots. We should handle click in timeline template.
    console.log('Clicked:', event);
  }
}
