export interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

export interface Appointment {
  id: number;
  doctorId: number;
  patientName: string;
  date: string; // ISO Date "YYYY-MM-DD"
  startMinutes: number; // e.g., 600 = 10:00 AM
  endMinutes: number;
  type: 'New' | 'Follow-up';
  notes?: string;
}
