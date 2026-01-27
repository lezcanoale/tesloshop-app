import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { BASE_URL } from '@products/services/products.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe, RouterLinkActive],
  templateUrl: './product-card.html',
})
export class ProductCard {
  title = input<string>('Titulo');
  description = input<string>(
    'Lorem ipsum dolor sit amet consectetur adipiscing elit euismod erat',
  );
  slug = input<string>('');
  imageUrl = input<string | string[] | undefined>('');
  // image = computed(() => {
  //   return `${BASE_URL}/files/product/${this.imageUrl()}`;
  // });
}
