import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  deliveryMethod: DeliveryMethod[] = [];
  
  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    if (this.deliveryMethod.length > 0) {
      return of(this.deliveryMethod);
    }
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'payments/delivery-methods').pipe(
      map(methods => {
        this.deliveryMethod = methods.sort((a,b) => b.price - a.price);
        return methods;
      })
    )
  }
}
