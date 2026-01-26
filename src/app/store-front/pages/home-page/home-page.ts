import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FrontNavbar } from '../../components/front-navbar/front-navbar/front-navbar';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';

// import { ProductCard } from '../../../products/components/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [FrontNavbar, ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductService);

  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productsService.getProducts({});
    },
  });
}
