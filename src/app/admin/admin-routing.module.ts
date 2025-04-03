import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'category', component: PostCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'product', component: PostProductComponent, canActivate: [AuthGuardService] },
  { path: 'coupons', component: CouponsComponent, canActivate: [AuthGuardService] },
  { path: 'post-coupon', component: PostCouponComponent, canActivate: [AuthGuardService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
  { path: 'faq/:productId', component: PostProductFaqComponent,canActivate: [AuthGuardService] },
  { path: 'product/:productId', component: UpdateProductComponent,canActivate: [AuthGuardService] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
