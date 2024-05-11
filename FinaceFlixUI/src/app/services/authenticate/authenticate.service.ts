import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../models/LoginRequest';
import { Observable, map } from 'rxjs';
import { UserAccount } from 'src/app/models/UserAccount';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  private endPoint = environment.loginApiUrl;

  public login(user: LoginRequest): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(this.endPoint, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<{ token: string }>) => {
          const token = response.body?.token || '';
          return { token };
        })
      );
  }

  public createAccount(account:UserAccount): Observable<UserAccount> {

    //implementar serviço de criação de conta
    return this.http.post<any>(this.endPoint, { observe: 'response' })
  }

}
