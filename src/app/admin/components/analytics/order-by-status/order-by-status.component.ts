import { Component, Input } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../../demo-angular-material/demo-angular-material.module';

@Component({
  selector: 'app-order-by-status',
  standalone: true,
  imports: [DemoAngularMaterialModule],
  templateUrl: './order-by-status.component.html',
  styleUrl: './order-by-status.component.scss'
})
export class OrderByStatusComponent {

  @Input() data:any;
}
