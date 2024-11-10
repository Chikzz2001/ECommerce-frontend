import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {

  categoryForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (res) => {
          if (res.id != null) {
            this.snackBar.open('Category posted Successfully!', 'Close', { duration: 5000 })
            this.router.navigateByUrl('/admin/dashboard')
          }
          else {
            this.snackBar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackBar' })
          }
        }

      )
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}

