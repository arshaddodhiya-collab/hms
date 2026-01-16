# Product Search Module

## Overview
This module implements a **Reactive State Management** pattern for searching products. It uses RxJS streams to handle user input, debounce, API simulation, and view state management without manual subscription management in the component.

## Flow & Architecture

### 1. The Reactive Store (`ProductSearchStore`)
This service acts as a local store using the MVVM (Model-View-ViewModel) pattern.
- **Inputs (Actions)**: 
  - `searchTerm$`: A `BehaviorSubject` receiving user input.
  - `refresh$`: A `Subject` for manual refresh triggers.
- **Process**:
  - `combineLatest` merges the search term and refresh triggers.
  - `switchMap` handles the "API call" (mocked with `delay`).
  - `debounceTime(400)` prevents excessive calls while typing.
- **Outputs (ViewModel)**:
  - `vm$`: A single observable combining `products`, `loading`, and `error` states. The component subscribes to this **once** via `async` pipe.

### 2. User Interaction
1. **Typing**: User types in the search box.
2. **Debounce**: The app waits 400ms.
3. **Mock API**: A simulated HTTP request fires (returning mock data like "iPhone 15").
4. **Render**: The `ProductListComponent` receives the data and renders the table.

## Components & Technologies

### Components
| Component | Responsibility |
|-----------|----------------|
| `ProductSearchComponent` | Smart Component. Connects the Form to the Store and passes VM data to children. |
| `ProductListComponent` | Dumb/Presentational Component. Renders the products table. |

### Technologies Used
- **RxJS Operators**: 
  - `switchMap`: To cancel previous pending searches.
  - `combineLatest`: To derive state from multiple sources.
  - `shareReplay`: To prevent duplicate side-effects.
  - `delay`, `of`: To simulate backend latency.
- **PrimeNG**:
  - `Table`: For displaying product data with rows and columns.
  - `Card`, `InputText`, `Button`: For layout and controls.
- **PrimeFlex**: For responsive layout grid.

## Key Logic
- **No manual `.subscribe()`**: The component logic is entirely declarative. The template uses `vm$ | async`, ensuring no memory leaks and cleaner code.
- **Mock Data**: Since there is no backend, `ProductSearchStore` returns hardcoded data after a simulated network delay.
