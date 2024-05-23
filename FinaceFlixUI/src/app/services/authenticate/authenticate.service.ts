import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../dtos/LoginRequest';
import { Observable, map } from 'rxjs';
import { UserAccount } from 'src/app/dtos/UserAccount';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.BaseUrl;

  public login(user: LoginRequest): Observable<{ token: string }> {

    const loginPath = this.baseUrl + environment.LoginPath;

    return this.http
      .post<{ token: string }>(loginPath, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<{ token: string }>) => {
          const token = response.body?.token || '';
          return { token };
        })
      );
  }

  public createAccount(account: UserAccount): Observable<{ responseBody: string }> {
    const createAccountPath = this.baseUrl + environment.CreateAccountPath;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Request payload:', JSON.stringify(account));

    return this.http
      .post(createAccountPath, account, { headers, observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<string>) => {
          const responseBody = response.body || '';
          return { responseBody };
        })
      );
  }


}
