export interface Appointment {
  doctorId: number;
  patientName: string;
  date: string; // YYYY-MM-DD
  startMinutes: number;
  endMinutes: number;
}
