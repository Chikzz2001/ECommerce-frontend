import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { OrderByStatusComponent } from './order-by-status/order-by-status.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [DemoAngularMaterialModule, OrderByStatusComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  data: any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAnalytics().subscribe(
      res => {
        console.log(res);
        this.data = res;
      }
    )
  }
}
