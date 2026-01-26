import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BASE_URL } from '@products/services/products.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  title = input<string>('Titulo');
  description = input<string>(
    'Lorem ipsum dolor sit amet consectetur adipiscing elit euismod erat',
  );
  slug = input<string>('');
  imageUrl = input<string>('');
  image = computed(() => {
    return `${BASE_URL}/files/product/${this.imageUrl()}`;
  });
}
