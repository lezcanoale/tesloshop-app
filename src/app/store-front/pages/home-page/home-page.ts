import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FrontNavbar } from '../../components/front-navbar/front-navbar/front-navbar';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';

// import { ProductCard } from '../../../products/components/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [FrontNavbar, ProductCard, PaginationComponent],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductService);
  paginationService = inject(PaginationService);
  // activatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //     map((page) => (isNaN(page) ? 1 : page)),
  //   ),
  // );

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage()! - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page ? params.page * 9 : 0,
      });
    },
  });
}
