# Patient Quick Registration Module

## Overview
This module implements a **Complex Reactive Form** for registering patients. It demonstrates advanced Angular Forms capabilities including dynamic fields, custom validation, and cross-field logic.

## Flow & Architecture

### 1. Form Structure
The form is built using `FormBuilder` and includes:
- **Simple Controls**: Name, Gender, DOB, Nationality.
- **Nested Groups**: `address` and `permanentAddress`.
- **FormArray**: `emergencyContacts` for adding multiple contacts dynamically.

### 2. Key Interactions
- **Conditional Logic**: 
  - The "Permanent Address same as Present" checkbox toggles the disabled state of the `permanentAddress` group.
  - Logic is handled in `checkAddressSync()` subscribed to value changes or click events.
- **Dynamic Rows**:
  - **Add Contact**: Pushes a new `FormGroup` to the `emergencyContacts` array.
  - **Remove Contact**: Removes the item at specific index (with confirmation).
- **Validation**:
  - **Custom Validator**: `minimumAgeValidator(18)` ensures the patient is an adult.
  - **Feedback**: Uses `MessageService` (Toast) to show validation errors or success messages.

## Components & Technologies

### Components
| Component | Responsibility |
|-----------|----------------|
| `PatientFormComponent` | Encapsulates the entire form logic, validation, and UI interaction. |

### Technologies Used
- **ReactiveFormsModule**: For robust form handling (`FormGroup`, `FormArray`, `Validators`).
- **PrimeNG**:
  - `InputMask`: For formatting Phone `(999) 999-9999` and Pincode `999999`.
  - `Dropdown` (Searchable): For Gender and Title selection.
  - `Calendar`: For Date of Birth.
  - `Toast` & `ConfirmDialog`: For user feedback and alerts.
- **PrimeFlex**: For responsive grid layout (e.g., `p-fluid`, `grid formgrid`).

## Key Logic
- **Disable/Enable Sync**: When `sameAsPermanent` is checked, we `disable()` the permanent address controls so they are excluded from validity checks but included in `getRawValue()` when submitting.
- **Masking**: Enforce strict input formats for critical fields like contact numbers.

---

## Version 2.0 Updates (Enterprise Forms Patterns)

### 1. ControlValueAccessor (Reusable Address Component)
- **Problem**: Address logic was duplicated for Present and Permanent addresses, bloating the main form.
- **Solution**: Extracted `AddressComponent` which implements `ControlValueAccessor`.
- **Usage**: `<app-address formControlName="address"></app-address>`. It communicates seamlessly with the parent `FormGroup` API.

### 2. Async Validators (Simulated Backend Check)
- **Feature**: Duplicate Contact Check.
- **Implementation**: `uniqueContactValidator` uses `PatientService` to simulate an API call (with 1s delay).
- **Behavior**: Typing a number ending in '000' triggers a "Contact number already registered" error after a debounce period.

### 3. Unsaved Changes Guard
- **Feature**: Accidental Navigation Protection.
- **Implementation**: `UnsavedChangesGuard` checks `form.dirty && !isSubmitted`.
- **Behavior**: If a user tries to leave the route with unsaved data, a browser confirmation dialog appears.
