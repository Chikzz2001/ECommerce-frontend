import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {
  coupons: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons() {
    this.adminService.getAllCoupons().subscribe(
      res => {
        this.coupons = res;
      }
    )
  }
}
