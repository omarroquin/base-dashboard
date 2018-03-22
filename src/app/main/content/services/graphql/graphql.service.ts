import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { config } from '../../../../../config';

@Injectable()
export class GraphqlService
{
  baseUrl: string = config.backendUrl;

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private http: HttpClient,
    private _cookieService: CookieService
  )
  {
    const baseUrl = httpLink.create({uri: `${this.baseUrl}/graphql`});

    const auth = setContext((_, { headers }) => {
      const token = this._cookieService.get('token');
      if (!token) {
        return {};
      } else {
        return {
          headers: new HttpHeaders().set('Authorization', token)
        };
      }
    });

    apollo.create({
      link: auth.concat(baseUrl),
      cache: new InMemoryCache()
    });
  }

  public async query(query, variables = null)
  {
    let args = null;
    if (!variables) args = { query };
    else { args = { query, variables } }
    return await new Promise((resolve, reject) => {
      this.apollo.watchQuery<any>(args)
        .valueChanges
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }

  public async mutation(mutation, variables)
  {
    return await new Promise((resolve, reject) => {
      this.apollo.mutate({ mutation, variables })
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }
}
