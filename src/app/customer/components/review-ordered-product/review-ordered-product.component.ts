import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';

@Component({
  selector: 'app-review-ordered-product',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss'
})
export class ReviewOrderedProductComponent {

  productId: number;
  reviewForm !: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = +params['productId'];
    });
  }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile)
    formData.append('productId', this.productId.toString())
    formData.append('userId', UserStorageService.getUserId().toString())
    formData.append('rating', this.reviewForm.get('rating').value)
    formData.append('description', this.reviewForm.get('description').value)

    this.customerService.giveReview(formData).subscribe(
      res => {
        if (res.id != null) {
          this.snackBar.open('Review Posted Successfully!', 'Close', { duration: 5000 })
          this.router.navigateByUrl('/customer/my_orders');
        }
        else {
          this.snackBar.open('Something went wrong', 'ERROR', { duration: 5000 })
        }
      }
    )
  }
}
