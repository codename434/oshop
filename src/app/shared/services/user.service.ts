import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appUser : AngularFireObject<AppUser>;

  constructor(private db: AngularFireDatabase) {  }

  save(user: firebase.User){
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid:string) : Observable<AppUser> {
    this.appUser = this.db.object('/users/'+ uid);
    return this.appUser.valueChanges();
  }
}
