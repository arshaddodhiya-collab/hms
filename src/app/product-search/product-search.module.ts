import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductSearchRoutingModule } from './product-search-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [ProductSearchComponent, ProductListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductSearchRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
  ],
})
export class ProductSearchModule {}
