import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-wishlist',
  standalone: true,
  imports: [DemoAngularMaterialModule],
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.scss'
})
export class ViewWishlistComponent {

  products: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getWishlistByUserId();
  }

  getWishlistByUserId() {
    this.customerService.getWishlistByUserId().subscribe(
      res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.products.push(element);
        })
      }
    )
  }
}
