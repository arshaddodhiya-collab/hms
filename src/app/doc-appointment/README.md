# Doctor Appointment Module

## Overview
This module provides a visual interface for scheduling doctor appointments. It features a weekly timeline view, doctor selection, and interactive slot booking.

## Flow & Architecture

### 1. Data Flow
- **Service Layer (`AppointmentService`)**: acts as the single source of truth, managing an in-memory state of appointments and doctors.
- **Container (`AppointmentContainerComponent`)**: 
  - Subscribes to `getDoctors()` to populate the dropdown.
  - When a doctor is selected, it fetches specific appointments via `getAppointments(doctorId)`.
  - Passes these appointments down to the Timeline component.
- **Presentation (`AppointmentTimelineComponent`)**: 
  - Receives `appointments` and `targetDate`.
  - Renders the grid and overlays appointment blocks using absolute positioning.
  - Emits `slotClick` events when a user clicks a time slot.

### 2. User Interaction Flow
1. **Select Doctor**: User chooses a doctor from the dropdown. The timeline updates to show that doctor's schedule.
2. **Book Appointment**: 
   - User clicks an empty time slot (e.g., 10:30 AM).
   - A **Booking Dialog** opens (using `p-dialog`).
   - User enters Patient Name, Type (New/Follow-up), and Notes.
3. **Save**:
   - Clicking "Book" calls `saveAppointment()`.
   - The Container calls `AppointmentService.addAppointment()`.
   - On success, the timeline fetches fresh data and re-renders.

## Components & Technologies

### Components
| Component | Responsibility |
|-----------|----------------|
| `AppointmentContainerComponent` | Orchestrator. Handles State, Doctor Selection, Dialogs, and Service calls. |
| `AppointmentTimelineComponent` | Visualizer. Renders the 7-day grid and places appointment blocks. |
| `AppointmentSlotComponent` | Interactive Unit. Represents a generic clickable time slot. |

### Technologies Used
- **PrimeNG**: `Dropdown`, `Dialog`, `Button`, `InputText`, `Card` for UI.
- **Date Manipulation**: Native `Date` object manipulation for grid generation and slot calculation.
- **Angular Inputs/Outputs**: For clean parent-child communication.
- **RxJS**: `Observable` and `of` for simulating asynchronous data operations.

## Key Logic
- **Grid Generation**: `generateWeek()` and `generateSlots()` create the visual structure.
- **Positioning**: `getTop()` calculates the `top` pixel value based on minutes from start time (e.g., `(startMinutes - 600) / 5 * 32px`).
