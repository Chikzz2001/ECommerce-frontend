// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterialModule } from './demo-angular-material/demo-angular-material.module';
import { AppRoutingModule } from './app-routing.module';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoAngularMaterialModule,
    AppRoutingModule,
    // LoginComponent,
    // SignupComponent
  ],
  exports: [
    DemoAngularMaterialModule
  ]
})
export class AppModule {}
