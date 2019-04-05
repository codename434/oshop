import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  //shoppingCartItemCount: number;
  // productIds: string[];
  // items;
  // cartTotal: number;
  cart$;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    //cart$.subscribe(cart => {
     // this.items = cart.payload.val().items;
      //this.productIds = Object.keys(this.items);

    //   this.shoppingCartItemCount = 0;
    //   // for(let productId in cart.payload.val().items){
    //   //   this.shoppingCartItemCount += cart.payload.val().items[productId].quantity;
    //   // }

    //   this.cartTotal = this.getCartTotal(this.items);
    // });
  }

  private getCartTotal(items){
    let total = 0;
    for(let productId in items){
      total += items[productId].product.price * items[productId].quantity;
    }
    return total;
  }

}
