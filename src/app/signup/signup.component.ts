import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] 
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]], 
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.snackBar.open("Passwords do not match.", "Close", { duration: 5000, panelClass: "error-snackBar" });
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open("Sign up successful!!", "Close", { duration: 5000 });
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.snackBar.open('Sign up failed. Please try again.', "Close", { duration: 5000, panelClass: "error-snackBar" });
      }
    );
  }
}

/*
Since SignupComponent is a standalone component, it does not depend on a module to provide it with dependencies such as Angular Material components or other shared modules. However, to use Angular Material components or other shared modules in this standalone component, you’ll need to import the necessary modules directly within SignupComponent because standalone components don't inherit the imports from modules like AppModule.
*/
