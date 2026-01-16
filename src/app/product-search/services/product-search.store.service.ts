import {
  Injectable,
  signal,
  computed,
  effect,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  finalize,
  delay,
  map,
  startWith,
  retry,
  tap,
} from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable()
export class ProductSearchStore {
  // 🔹 State Signals
  private searchTerm = signal<string>('');
  private refresh$ = new Subject<void>();

  // 🔹 Read-only State Signals
  private _products = signal<Product[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // 🔹 Exposed Signals (ViewModel)
  // Computed signal merging all state for easy consumption
  readonly vm = computed(() => ({
    products: this._products(),
    loading: this._loading(),
    error: this._error(),
  }));

  constructor(private injector: Injector) {
    this.setupSearchEffect();
  }

  private setupSearchEffect() {
    // Bridge Signal to Observable for Debounce/SwitchMap power
    const term$ = toObservable(this.searchTerm, {
      injector: this.injector,
    }).pipe(debounceTime(400), distinctUntilChanged());

    term$.pipe(switchMap((term) => this.fetchProducts(term))).subscribe();

    // Handle manual refresh
    this.refresh$
      .pipe(switchMap(() => this.fetchProducts(this.searchTerm())))
      .subscribe();
  }

  private fetchProducts(term: string) {
    this._loading.set(true);
    this._error.set(null);

    return of(this.generateMockProducts()).pipe(
      delay(800), // Simulate network
      map((products) => {
        if (!term) return products;
        return products.filter((p) =>
          p.name.toLowerCase().includes(term.toLowerCase())
        );
      }),
      retry(3), // 🔁 Retry failed requests 3 times
      tap({
        next: (data) => this._products.set(data),
        error: (err) => {
          this._error.set('Failed to load products after 3 retries.');
          this._products.set([]); // Clear products on error
        },
      }),
      catchError(() => of([])), // Handled in tap/error but clean up stream
      finalize(() => this._loading.set(false))
    );
  }

  // 🔹 Actions
  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  refresh() {
    this.refresh$.next();
  }

  // 🧬 Generator for 1000 Items
  private generateMockProducts(): Product[] {
    const categories = [
      'Electronics',
      'Laptops',
      'Headphones',
      'Accessories',
      'Smart Home',
    ];
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Product Item ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 50,
      category: categories[Math.floor(Math.random() * categories.length)],
    }));
  }
}
