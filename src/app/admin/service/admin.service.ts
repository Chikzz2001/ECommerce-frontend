import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/api/admin"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/category', categoryDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL, {
      headers: this.createAuthorizationHeader()
    })
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/product', productDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + `/products`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/product/${productId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateProduct(productId: number, productDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `/product/${productId}`, productDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `/product/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(BASIC_URL + `/product/${productId}`,
      { headers: this.createAuthorizationHeader(), observe: 'response' });
  }

  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/coupons', couponDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllCoupons(): Observable<any> {
    return this.http.get(BASIC_URL + `/coupons`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getPlacedOrders(): Observable<any> {
    return this.http.get(BASIC_URL + `/placedOrders`, {
      headers: this.createAuthorizationHeader()
    })
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `/placedOrders/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  postFAQ(productId: number, faqDto: string): Observable<any> {
    return this.http.post(BASIC_URL + `/faq/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
