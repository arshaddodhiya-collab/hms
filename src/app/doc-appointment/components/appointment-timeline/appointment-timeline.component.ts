import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DayColumn, TimeSlot } from '../../models/timeline.model';

@Component({
  selector: 'app-appointment-timeline',
  templateUrl: './appointment-timeline.component.html',
  styleUrls: ['./appointment-timeline.component.scss'],
})
export class AppointmentTimelineComponent implements OnInit {
  @Input() appointments: any[] = [];
  @Input() targetDate: Date = new Date();
  @Output() slotClick = new EventEmitter<any>();

  days!: DayColumn[];
  slots!: TimeSlot[];
  currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  ngOnInit(): void {
    this.days = this.generateWeek(new Date());
    this.slots = this.generateSlots();
  }

  getAppointmentsForDay(day: DayColumn) {
    if (!this.appointments) return [];
    return this.appointments.filter(
      (a) => a.date === day.date.toISOString().split('T')[0]
    );
  }

  getHeight(app: any): number {
    return ((app.endMinutes - app.startMinutes) / 5) * 32;
  }

  getTop(app: any): number {
    const startMinutes = 600;
    return ((app.startMinutes - startMinutes) / 5) * 32;
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

  isToday(day: DayColumn): boolean {
    const today = new Date();
    return (
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
    );
  }

  getTopPosition(): number {
    const startMinutes = 600; // 10:00 AM
    const slotHeight = 32;
    return ((this.currentMinutes - startMinutes) / 5) * slotHeight;
  }
}
