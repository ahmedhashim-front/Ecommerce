import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/invironment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(
      `${environment.productBaseUrl}`
      //
    );
  }

  getSpecificproduct(id: string): Observable<any> {
    return this.httpClient.get(`${environment.productBaseUrl}` + id);
  }
}
