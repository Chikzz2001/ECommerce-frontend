import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/api/customer/';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + `products`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `product/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  addToCart(productId: any): Observable<any> {
    const cardDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `cart`, cardDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCartByUserId(userId: string): Observable<any> {
    return this.http.get(BASIC_URL + `cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
