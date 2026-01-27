import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  idSlug = inject(ActivatedRoute).snapshot.params['idSlug'];
  productService = inject(ProductService);
  productsResource = rxResource({
    params: () => ({ idSlug: this.idSlug }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.idSlug);
    },
  });
}
