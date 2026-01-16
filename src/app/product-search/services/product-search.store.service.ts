import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  finalize,
  shareReplay,
  exhaustMap,
  startWith,
  delay,
  map,
} from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable()
export class ProductSearchStore {
  // 🔥 HOT STREAMS (state holders)
  private searchTerm$ = new BehaviorSubject<string>('');
  private refresh$ = new Subject<void>();
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  private errorSubject$ = new BehaviorSubject<string | null>(null);

  // 🔹 Exposed state
  loading$ = this.loadingSubject$.asObservable();
  error$ = this.errorSubject$.asObservable();

  // 🔹 MAIN DATA STREAM
  products$ = combineLatest([
    this.searchTerm$.pipe(debounceTime(400), distinctUntilChanged()),
    this.refresh$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([term]) => {
      this.loadingSubject$.next(true);
      this.errorSubject$.next(null);

      // ❄ Cold observable (Mock API)
      const mockProducts: Product[] = [
        { id: 1, name: 'iPhone 15', price: 999, category: 'Electronics' },
        {
          id: 2,
          name: 'Samsung Galaxy S24',
          price: 899,
          category: 'Electronics',
        },
        { id: 3, name: 'MacBook Pro', price: 1999, category: 'Laptops' },
        { id: 4, name: 'Dell XPS 15', price: 1599, category: 'Laptops' },
        { id: 5, name: 'Sony WH-1000XM5', price: 349, category: 'Headphones' },
      ];

      return of(mockProducts).pipe(
        delay(800), // Simulate network latency
        map((products) => {
          if (!term) return products;
          return products.filter((p) =>
            p.name.toLowerCase().includes(term.toLowerCase())
          );
        }),
        catchError(() => {
          this.errorSubject$.next('Failed to load products');
          return of([]);
        }),
        finalize(() => this.loadingSubject$.next(false))
      );
    }),
    shareReplay(1) // 🔥 prevent duplicate API calls
  );

  // 🔹 ViewModel stream (UI-friendly)
  vm$ = combineLatest([this.products$, this.loading$, this.error$]).pipe(
    map(([products, loading, error]) => ({
      products,
      loading,
      error,
    }))
  );

  constructor() {}

  // 🔹 Actions
  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  refresh() {
    this.refresh$.next();
  }
}
