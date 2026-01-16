import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductSearchStore } from '../../services/product-search.store.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  providers: [ProductSearchStore], // feature-level store
})
export class ProductSearchComponent implements OnInit {
  searchControl = new FormControl('', { nonNullable: true });
  // Expose signal directly
  vm = this.store.vm;

  constructor(private store: ProductSearchStore) {}

  ngOnInit() {
    // Sync form control with store signal
    this.searchControl.valueChanges.subscribe((value) => {
      this.store.setSearchTerm(value);
    });
  }

  refresh() {
    this.store.refresh();
  }
}
