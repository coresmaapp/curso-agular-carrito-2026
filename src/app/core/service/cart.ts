import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


import {
  AddToCartPayload,
  CartInterface,
  CheckoutPayload,
  UpdateCartItemPayload,
} from '@modules/carrito/carrito.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private readonly url = `${environment.apiUrl}/api/shoppingcart/carts/`;
  private readonly http = inject(HttpClient);

  public getCurrentCart(): Observable<CartInterface> {
    return this.http.get<CartInterface>(`${this.url}current/`);
  }

  public addItem(cartId: number, payload: AddToCartPayload): Observable<CartInterface> {
    return this.http.post<CartInterface>(`${this.url}${cartId}/add_item/`, payload);
  }
}
