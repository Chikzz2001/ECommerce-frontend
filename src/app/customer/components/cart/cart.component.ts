import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  order: any;
  coupons: any[] = [];
  hoveredCoupon: any = null;

  couponForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    })
    this.getCart();
    this.getCoupons();
  }

  applyCoupon() {
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(
      res => {
        this.snackBar.open("Coupon Applied Successfully", "Close", { duration: 5000 });
        this.getCart();
      },
      error => {
        this.snackBar.open(error.error, "Close", { duration: 5000 })
      }
    )
  }

  getCart() {
    this.cartItems = [];
    console.log(UserStorageService.getUserId());
    this.customerService.getCartByUserId(UserStorageService.getUserId()).subscribe(
      res => {
        this.order = res;
        console.log(this.order);
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
        console.log(this.cartItems);
      }
    )
  }

  increaseQuantity(productId: any) {
    this.customerService.increaseProductQuantity(productId).subscribe(
      res => {
        this.snackBar.open("Product quantity increased.", "Close", { duration: 5000 });
        this.getCart();
      }
    )
  }

  decreaseQuantity(productId: any) {
    this.customerService.decreaseProductQuantity(productId).subscribe(
      res => {
        this.snackBar.open("Product quantity decreased.", "Close", { duration: 5000 });
        this.getCart();
      }
    )
  }

  placeOrder() {
    this.dialog.open(PlaceOrderComponent);
  }

  getCoupons() {
    this.customerService.getAllCoupons().subscribe(
      res => {
        this.coupons = res;
        console.log(res);
      }
    )
  }
  
}

