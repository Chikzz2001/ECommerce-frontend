import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if(UserStorageService.isAdminLoggedIn()) {
      return true;
    }
    else {
      document.body.innerHTML = "<h2 style='text-align:center;margin-top:20%'>You are not authorized to access this page.</h2>";
      return false;
    }
  }
}
