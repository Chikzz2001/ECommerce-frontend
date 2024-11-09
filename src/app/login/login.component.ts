import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../demo-angular-material/demo-angular-material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoAngularMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
