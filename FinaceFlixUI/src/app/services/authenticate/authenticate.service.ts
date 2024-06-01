import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../dtos/LoginRequest';
import { Observable, map } from 'rxjs';
import { UserAccount } from 'src/app/dtos/UserAccount';
import { UserResponse } from 'src/app/dtos/UserResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.BaseUrl;

  public login(user: LoginRequest): Observable<{ nome:string, tipo:string,email:string, token:string }> {
    
    const loginPath = this.baseUrl + environment.LoginPath;

    return this.http
      .post<{ nome:string, tipo:string,email:string, token:string }>(loginPath, user, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<{ nome:string, tipo:string,email:string, token:string }>) => {
          const token = response.body?.token || '';

          const name = response.body?.nome || '';
          const type = response.body?.tipo || '';
          const email = response.body?.email || '';


          return { nome:name, tipo:type,email:email, token };
        })
      );
  }

  public createAccount(
    account: UserAccount
  ): Observable<{ responseBody: string }> {
    const createAccountPath = this.baseUrl + environment.CreateAccountPath;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log('Request payload:', JSON.stringify(account));

    return this.http
      .post(createAccountPath, account, {
        headers,
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response: HttpResponse<string>) => {
          const responseBody = response.body || '';
          return { responseBody };
        })
      );
  }
}
