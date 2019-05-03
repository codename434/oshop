import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', queryFn => queryFn.orderByChild('name')).snapshotChanges()
    .pipe(map(changes => {
      return changes.map(c=> ({key: c.payload.key, value: c.payload.val()}))
    }));
  }
}
