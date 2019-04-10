import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  items : any[] = [];
  userId;

  constructor(
    authService: AuthService,
    orderService: OrderService
    ) {
      authService.$user.pipe(switchMap(u=> orderService.getOrdersByUserId(u.uid)))
        .subscribe(item=> {
          item.forEach(x=> {
            this.items.push(x.payload.val());
          });
      });
    }
}
