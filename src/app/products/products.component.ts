import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductKeyValue } from '../models/app-product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductKeyValue[] = [];
  filteredProducts: ProductKeyValue[] = [];
  cart: any;
  category: string;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService) {
      productService.getAll().subscribe((products: ProductKeyValue[]) => {
        this.products = products;

        route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.value.category === this.category) :
            this.products;
        });
      });
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart.payload.val();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
