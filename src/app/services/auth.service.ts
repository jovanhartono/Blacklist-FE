import { Injectable } from '@angular/core';
import {UserLogin} from '../interfaces/userLogin';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UserRegister} from '../interfaces/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginPath = 'api/login';
  private readonly registerPath = '/api/register';

  constructor(private httpClient: HttpClient) { }

  login(userLogin: UserLogin): Observable<any>{
    return this.httpClient.post(environment.serverBackendUrl + this.loginPath, userLogin);
  }

  register(userRegister: UserRegister): Observable<any>{
    return this.httpClient.post<any>(environment.serverBackendUrl + this.registerPath, userRegister);
  }
}
