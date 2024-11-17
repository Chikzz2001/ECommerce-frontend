import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DemoAngularMaterialModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPlacedOrders();
  }

  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe(
      res => {
        this.orders = res;

      }
    )
  }

  changeOrderStatus(orderId: number, status: string) {
    this.adminService.changeOrderStatus(orderId, status).subscribe(
      res => {
        if (res.id != null) {
          this.snackBar.open("Order Status Changed Successfully", "Close", { duration: 5000 });
          this.getPlacedOrders();
        }
        else {
          this.snackBar.open("Something went wrong", "Close", { duration: 5000 });
        }
      }
    )
  }
}
