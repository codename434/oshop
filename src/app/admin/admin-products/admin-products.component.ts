import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { ProductKeyValue } from 'src/app/models/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
  products : ProductKeyValue[];
  filteredProduct : ProductKeyValue[];
  subscription : Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe((products : ProductKeyValue[] ) => this.filteredProduct = this.products = products);
   }


  filter(query : string){
    this.filteredProduct = (query) ?
      this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
