import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductKeyValue } from '../models/app-product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductKeyValue[] = [];
  filteredProducts: ProductKeyValue[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService) { }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    this.productService.getAll().subscribe((products: ProductKeyValue[]) => {
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.value.category === this.category) :
    this.products;
  }
}
