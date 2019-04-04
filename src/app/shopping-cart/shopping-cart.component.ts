import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number;
  productIds: string[];
  items;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.subscribe((cart : any)=> {
      this.items = cart.payload.val().items;
      this.productIds = Object.keys(this.items);

      this.shoppingCartItemCount = 0;
      for(let productId in cart.payload.val().items){
        this.shoppingCartItemCount += cart.payload.val().items[productId].quantity;
      }
    });
  }

}
