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

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: PostCategoryComponent },
  { path: 'product', component: PostProductComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: 'post-coupon', component: PostCouponComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'faq/:productId', component: PostProductFaqComponent },
  { path: 'product/:productId', component: UpdateProductComponent },
  { path: 'analytics', component: AnalyticsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
