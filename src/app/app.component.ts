import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './demo-angular-material/demo-angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceWeb';
}
