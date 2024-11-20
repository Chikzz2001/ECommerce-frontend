import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { DemoAngularMaterialModule } from '../demo-angular-material/demo-angular-material.module';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [ReactiveFormsModule, DemoAngularMaterialModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {

  searchOrderForm !: FormGroup;
  order: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.searchOrderForm = this.fb.group({
      trackingId: [null, [Validators.required]]
    })
  }

  submitForm() {
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe(
      res => {
        console.log(res);
        this.order = res;
      }
    )
  }
}
