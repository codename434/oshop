import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges()
    .pipe(map(changes => {
      return changes.map(c=> ({key: c.payload.key, value: c.payload.val()}));
    }));
  }
}