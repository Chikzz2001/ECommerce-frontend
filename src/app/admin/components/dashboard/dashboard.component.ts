import { Component, Sanitizer } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DemoAngularMaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm !: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe(
      res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
        console.log(this.products)
      }
    )
  }

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe(
      res => {
        if (res.body == null) {
          this.snackBar.open("Product Deleted Successfully.", "Close", { duration: 5000 });
          this.getAllProducts();
        }
        else {
          this.snackBar.open(res.message, "Close", { duration: 5000, panelClass: 'error-snackBar' })
        }
      }
    )
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(
      res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
        console.log(this.products)
      }
    )
    console.log(this.products)
  }
}
