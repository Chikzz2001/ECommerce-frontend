import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../demo-angular-material/demo-angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, DemoAngularMaterialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
}

/*
Since SignupComponent is a standalone component, it does not depend on a module to provide it with dependencies such as Angular Material components or other shared modules. However, to use Angular Material components or other shared modules in this standalone component, you’ll need to import the necessary modules directly within SignupComponent because standalone components don't inherit the imports from modules like AppModule.
*/
