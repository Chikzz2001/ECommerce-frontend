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

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `/product/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(BASIC_URL + `/product/${productId}`,
      { headers: this.createAuthorizationHeader(), observe: 'response' });
  }



  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
