import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
  couponForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      discount: [null, Validators.required],
      expirationDate: [null, Validators.required]
    })
  }
  addCoupon() {
    if(this.couponForm.valid) {
      this.adminService.addCoupon(this.couponForm.value).subscribe(
        res => {
          if(res.id != null) {
            this.snackBar.open('Coupon Posted Successfully', 'Close', {duration: 5000});
            this.router.navigateByUrl('/admin/dashboard');
          }
          else {
            this.snackBar.open(res.message, 'Close', {
              duration: 5000,
              panelClass: 'error-snackBar'
            });
          }
        })
    }
    else {
      this.couponForm.markAllAsTouched();
    }
  }


}
