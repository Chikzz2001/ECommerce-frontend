import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';

@Component({
  selector: 'app-view-product-detail',
  standalone: true,
  imports: [DemoAngularMaterialModule],
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent {

  productId: number;
  product: any;
  FAQs: any[] = [];
  reviews: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = +params['productId']
    })
  }

  ngOnInit(): void {
    this.getProductDetailById();
  }

  getProductDetailById() {
    this.customerService.getProductDetailById(this.productId).subscribe(
      res => {
        this.product = res.productDto;
        this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;
        this.FAQs = res.faqDtoList;

        res.reviewDtoList.forEach(element => {
          element.processedImg = 'data:image/png;base64,' + element.returnedImg;
          this.reviews.push(element);
        });
      }
    )
  }

}
