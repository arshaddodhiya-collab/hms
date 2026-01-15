import { Component, OnInit } from '@angular/core';
import { DayColumn, TimeSlot } from '../../models/timeline.model';

@Component({
  selector: 'app-appointment-timeline',
  templateUrl: './appointment-timeline.component.html',
  styleUrls: ['./appointment-timeline.component.scss'],
})
export class AppointmentTimelineComponent implements OnInit {
  days!: DayColumn[];
  slots!: TimeSlot[];

  ngOnInit(): void {
    this.days = this.generateWeek(new Date());
    this.slots = this.generateSlots();
  }

  generateWeek(start: Date): DayColumn[] {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);

      return {
        date: d,
        label: d.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        dayName: d.toLocaleDateString('en-IN', { weekday: 'long' }),
      };
    });
  }

  generateSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    for (let m = 600; m <= 1020; m += 5) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      slots.push({
        minutes: m,
        time: `${h % 12 || 12}:${min.toString().padStart(2, '0')} ${
          h >= 12 ? 'PM' : 'AM'
        }`,
      });
    }
    return slots;
  }
}
