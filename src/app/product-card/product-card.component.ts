import { Component, Input } from '@angular/core';
import { ProductKeyValue } from '../models/app-product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: ProductKeyValue;
  @Input('show-actions') showActions = true;

  constructor() { }

  addToCart(product : ProductKeyValue ){
    
  }
}
