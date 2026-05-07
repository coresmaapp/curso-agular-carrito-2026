import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@modules/productos/models/product.models'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/api/shoppingcart/public-product`;
  // private apiUrl = `/api/shoppingcart/public-products`;

  // constructor(private http: HttpClient) {
  // }

  private http = inject(HttpClient)


  public getAllProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl)
  }

}