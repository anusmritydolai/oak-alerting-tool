import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceLoginUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

   login(userData: any): Observable<any> {
    let formdata = new FormData();
    formdata.append('email', userData.email);
    formdata.append('password', userData.password);
    return this.http.post(`${serviceLoginUrl}auth/login`, formdata);
  }
}
