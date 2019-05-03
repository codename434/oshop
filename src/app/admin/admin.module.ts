import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { AdminOrdersComponent } from './component/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './component/admin-products/admin-products.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path:'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [ AuthGuard, AdminAuthGuard ]  
      },
      { 
        path:'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [ AuthGuard, AdminAuthGuard ]  
      },
      { 
        path:'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [ AuthGuard, AdminAuthGuard ]  
      },
      { 
        path:'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [ AuthGuard, AdminAuthGuard]  
      },
    ])
  ],
  providers:[
    AdminAuthGuard
  ]
})
export class AdminModule { }
