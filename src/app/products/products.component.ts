import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductKeyValue } from '../models/app-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products : ProductKeyValue[] = [];
  filteredProducts : ProductKeyValue[] = [];
  
  category : string;

  constructor(
    route: ActivatedRoute,
    productService : ProductService) 
    { 
    productService.getAll().subscribe((products : ProductKeyValue[]) => { 
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.value.category === this.category) :
          this.products;
      });
    });
  }
}
