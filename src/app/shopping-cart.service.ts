import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take,map } from 'rxjs/operators';
import { ProductKeyValue } from './models/app-product';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(map(x=> new ShoppingCart(x.payload.val().items))); 
  }


  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId ) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId );
  }

  async addToCart(product :ProductKeyValue){
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) {
        this.getItem(cartId, product.key).update({
          product: product.value,
          quantity: (item.payload.val().quantity) + 1
        });
      }
      else {
        this.getItem(cartId, product.key).set({
          product: product.value,
          quantity: 1
        });
      }
    })
  }

  async removeFromCart(product : ProductKeyValue){
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      this.getItem(cartId, product.key).update({
        product: product.value,
        quantity: (item.payload.val().quantity) - 1
      });
    });
  }
}
