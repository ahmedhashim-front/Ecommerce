import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/invironment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.catedoriesBaseUrl}`);
  }
  getSpaceficCategories(id: string): Observable<any> {
    return this.httpClient.get(`${environment.catedoriesBaseUrl}${id}`);
  }
}
