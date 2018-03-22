import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';
import { config } from '../../../../../config';
import gql from 'graphql-tag';

@Injectable()
export class AuthorizationService
{
  baseUrl: string = config.backendUrl;
  user = null;

  constructor(
    private httpClient: HttpClient,
    private _cookieService: CookieService,
    private router: Router,
    private graphqlService: GraphqlService
  )
  {

  }

  public async httpPost(url: string, headers: object, body: object)
  {
    let httpHeaders = new HttpHeaders();
    for (var key in headers) {
      httpHeaders.set(key, headers[key]);
    }
    return await new Promise((resolve, reject) => {
      this.httpClient.post(url, body, { headers: httpHeaders })
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }

  public async httpGet(url: string, headers: object)
  {
    let httpHeaders = await new HttpHeaders();
    for (var key in headers) {
      httpHeaders = await httpHeaders.set(key, headers[key]);
    }
    return await new Promise((resolve, reject) => {
      this.httpClient.get(url, { headers: httpHeaders })
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }

  public async login(email: string, password: string)
  {
    let url = `${this.baseUrl}/auth/signin`,
        headers = { 'Content-Type': 'application/json' },
        body = { email, password };

    try {
      let token = (await this.httpPost(url, headers, body))['token'];
      this.updateToken(token);
      this.router.navigate(['/stages']);
    } catch(error) {
      console.error(error);
    }
  }

  private updateToken(token: string)
  {
    this._cookieService.put('token', token);
  }

  public getToken()
  {
    return this._cookieService.get('token');
  }

  public deleteToken()
  {
    this._cookieService.remove('token');
    this.router.navigate(['/auth/login']);
  }

  public async isLogged()
  {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['auth/login']);
      return false;
    }
    const getUser = gql`
      query {
        users {
          _id name type
        }
      }
    `;
    try {
      this.user = (await this.graphqlService.query(getUser))['data'].users[0];
    } catch(error) {
      this.router.navigate(['/auth/login']);
      console.error(error);
      return false;
    } finally {
      if (
        this.user.name && (this.router.url.indexOf('/auth/login') === 0)
      ) this.router.navigate(['/stages']);
      return this.user;
    }
  }

  public getCurrentUser()
  {
    return this.user;
  }
}
