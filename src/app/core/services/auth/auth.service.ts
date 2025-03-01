import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/invironment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private httpClient: HttpClient) {}
  router = inject(Router);
  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.authBaseUrl}/signup`, data);
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.authBaseUrl}/signin`, data);
  }
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log('userData', this.userData);
    }
  }
  logOut(): void {
    //delete token
    localStorage.removeItem('userToken');
    this.userData = null;
    //nzvigate to login
    this.router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.authBaseUrl}/forgotPasswords`,
      data
    );
  }
  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.authBaseUrl}/verifyResetCode`,
      data
    );
  }
  setNewPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      data
    );
  }
}
