import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductSearchStore } from '../../services/product-search.store.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  providers: [ProductSearchStore], // feature-level store
})
export class ProductSearchComponent {
  searchControl = new FormControl('');
  vm$ = this.store.vm$;

  constructor(private store: ProductSearchStore) {
    // 🔥 Form → Stream
    this.searchControl.valueChanges.subscribe((value) => {
      this.store.setSearchTerm(value ?? '');
    });
  }

  refresh() {
    this.store.refresh();
  }
}
