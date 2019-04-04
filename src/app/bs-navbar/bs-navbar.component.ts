import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser : AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) { 
    
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser );
    
    let cart$ = await this.cartService.getCart();
    cart$.subscribe((cart : any)=> {
      this.shoppingCartItemCount = 0;
      for(let productId in cart.payload.val().items){
        this.shoppingCartItemCount += cart.payload.val().items[productId].quantity;
      }
    })
  }

  logout(){
    this.auth.logout();
  }
}
