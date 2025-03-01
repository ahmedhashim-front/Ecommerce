import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/invironment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private httpClient: HttpClient) {}

  showAllSubCat(): Observable<any> {
    return this.httpClient.get(`${environment.subcat}`);
  }
  showSpaceficSubCat(id: string): Observable<any> {
    return this.httpClient.get(` ${environment.subcat}  ` + id);
  }
  showAllSubOnCat(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }
}
