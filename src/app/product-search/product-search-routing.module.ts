import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductSearchComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductSearchRoutingModule {}
