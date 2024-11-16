import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {
  orderForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    })
  }

  placeOrder() {
    this.customerService.placeOrder(this.orderForm.value).subscribe(
      res => {
        if (res.id != null) {
          this.snackBar.open("Order placed successfully", "Close", { duration: 5000 });
          this.router.navigateByUrl("/customer/my-orders");
        }
        else {
          this.snackBar.open("Something went wrong", "Close", { duration: 5000 })
        }
      }
    )
  }

  closeForm() {
    this.dialog.closeAll();
  }
}
