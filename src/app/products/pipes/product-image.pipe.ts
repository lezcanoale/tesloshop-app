import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '@products/services/products.service';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (typeof value === 'string') {
      return `${BASE_URL}/files/product/${value}`;
    }
    const image = value.at(0);

    if (!image) {
      return './assets/images/no-images.jpg';
    }

    return `${BASE_URL}/files/product/${value[0]}`;
  }
}
