import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [DemoAngularMaterialModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {

  myOrders: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe(
      res => {this.myOrders=res;}
    )
  }

}
