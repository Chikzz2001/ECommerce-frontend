import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (UserStorageService.isAdminLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    } else if (UserStorageService.isCustomerLoggedIn()) {
      this.router.navigate(['/customer/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (res) => {
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("admin/dashboard");
          this.snackBar.open('Login Success', 'Ok', { duration: 5000 })
        }
        else if (UserStorageService.isCustomerLoggedIn()) {
          console.log(UserStorageService.isCustomerLoggedIn());
          this.router.navigateByUrl("customer/dashboard");
          this.snackBar.open('Login Success', 'Ok', { duration: 5000 })
        }
      },
      (err) => {
        this.snackBar.open('Bad Credentials', 'ERROR', { duration: 5000 })
      }
    )
  }
}
